import apiCfg from './apicfg';
import {getPxToken} from "@spark/projectx";
import {callApi} from '@spark/api-base'
import {hideLoading, Toast} from '@spark/ui'
import {isFromShare, newUser} from 'duiba-utils';
import modalStore from '@src/store/modal';

let mergeData = {
	user_type: newUser ? '0' : '1',
	is_from_share: isFromShare ? '0' : '1',
}

const apiList = {
	...apiCfg
}


const API ={};
export default API;

function getRequestParams(value) {
	return api;
}
