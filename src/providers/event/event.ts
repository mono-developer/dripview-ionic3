import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { HttpProvider } from '../http/http';
import { URLSearchParams } from '@angular/http';

@Injectable()
export class EventProvider {

  constructor(public http: Http,
              public httpProvider: HttpProvider) {
  }

  like(id){
    return this.httpProvider.httpPutWithAuth("/event/"+id+"/like",null);
  }

  unLike(id){
    return this.httpProvider.httpDeleteWithAuth("/event/"+id+"/like");
  }

  getEvents(mode,page,per_page){
      let params: URLSearchParams = new URLSearchParams();
      params.set('page',page);
      params.set('per_page',per_page);
    return this.httpProvider.httpGetWithAuth("/event/"+mode,params);
  }

  getEventDetail(id){
    return this.httpProvider.httpGetWithAuth("/event/"+id,null);
  }

  getEventLikes(id,page,per_page){
    let params: URLSearchParams = new URLSearchParams();
    params.set('page',page);
    params.set('per_page',per_page);
    return this.httpProvider.httpGetWithAuth("/event/"+id+'/likes',params);
  }

    comment(id,param){
        let body = JSON.stringify(param);
        return this.httpProvider.httpPostWithAuth("/event/"+id+"/comment",body);
    }

}
