// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** addApiInterface POST /api/apiInterface/add */
export async function addApiInterfaceUsingPOST(
  body: API.ApiInterfaceAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponselong>('/api/apiInterface/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** deleteApiInterface POST /api/apiInterface/delete */
export async function deleteApiInterfaceUsingPOST(
  body: API.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseboolean>('/api/apiInterface/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** getApiInterfaceById GET /api/apiInterface/get */
export async function getApiInterfaceByIdUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getApiInterfaceByIdUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseApiInterface>('/api/apiInterface/get', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** invokeApiInterface POST /api/apiInterface/invoke */
export async function invokeApiInterfaceUsingPOST(
  body: API.ApiInterfaceInvokeRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseobject>('/api/apiInterface/invoke', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** listApiInterface GET /api/apiInterface/list */
export async function listApiInterfaceUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listApiInterfaceUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseListApiInterface>('/api/apiInterface/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** listApiInterfaceByPage GET /api/apiInterface/list/page */
export async function listApiInterfaceByPageUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listApiInterfaceByPageUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageApiInterface>('/api/apiInterface/list/page', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** offlineApiInterface POST /api/apiInterface/offline */
export async function offlineApiInterfaceUsingPOST(
  body: API.idRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseboolean>('/api/apiInterface/offline', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** onlineApiInterface POST /api/apiInterface/online */
export async function onlineApiInterfaceUsingPOST(
  body: API.idRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseboolean>('/api/apiInterface/online', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** updateApiInterface POST /api/apiInterface/update */
export async function updateApiInterfaceUsingPOST(
  body: API.ApiInterfaceUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseboolean>('/api/apiInterface/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
