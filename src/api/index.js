import apiCfg from './apicfg';
import {getPxToken} from "@spark/projectx";
import {callApi} from '@spark/api-base'
import {Toast} from '@spark/ui'

import {isFromShare, newUser} from 'duiba-utils';

let mergeData = {
	user_type: newUser ? '0' : '1',
	is_from_share: isFromShare ? '0' : '1',
}

const apiList = {
	...apiCfg
}


const API = generateAPI(apiList);
export default API;

function getRequestParams(value) {
	if (typeof value === 'string') {
		return {
			uri: value,
			method: 'get'
		}
	} else if (typeof value === 'object') {
		const {uri, method = 'get', headers, withToken, secret, secretKey, contentType = 'form'} = value;
		return {
			uri,
			method,
			headers,
			withToken,
			secret,
			secretKey,
			contentType,
		}
	} else {
		console.error('getRequestParams: 传参有误');
	}
}


function generateAPI(apiList) {
	const api = {};
	for (let key in apiList) {
		let value = apiList[key];

		const {method, uri, headers: mHeaders, withToken, secret, secretKey, contentType} = getRequestParams(value);
		api[key] = async (params = {}, headers) => {
			let token;
			if (withToken) {
				try {
					token = await getPxToken();
				} catch (e) {
					Toast('星速台token获取失败，***请补全该处理逻辑***');
					return;
				}
			}

			let mergedHeaders = {...mHeaders, ...headers}
			if (withToken && token) {
				params.token = token;
			}

			params = {...params, ...mergeData};

			const result = await callApi(uri, params, method, mergedHeaders, false, secret, secretKey, contentType)
				.catch(e => {
					//捕获网络异常
					Toast((e.message || '网络异常') + ' ***请补全该处理逻辑***');
				});
			if (result) {
				//判断接口错误
				if (!result.success) {
					Toast((result.message || '接口错误') + ' ***请补全该处理逻辑***');
				}
				//返回整个结果
				return result;
			}
		}
	}

	return api;
}
