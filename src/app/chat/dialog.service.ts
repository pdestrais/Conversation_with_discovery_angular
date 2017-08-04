/**
 * (C) Copyright IBM Corp. 2016. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License
 * is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
 * or implied. See the License for the specific language governing permissions and limitations under
 * the License.
 */
import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';

/*
 * This class is responsible for making REST calls to trigger setup process or call Conversation service.
 */
@Injectable ()
export class DialogService {
  private workspace_id : string;
  //private processQuestionSource = new Subject<any>();

  constructor (private http : Http) {
  }

  public setup () {
    return this.http.get ('/rest/setup').map (res => res.json());
  }
  public message(payloadToWatson) {
    let headers = new Headers ();
    headers.append ('Content-Type', 'application/json');

    payloadToWatson = payloadToWatson || {};
    return this.http.post ('/api/conversation',
      JSON.stringify (payloadToWatson), {headers: headers}).map (res => res.json ());
  }

  public queryCollection(payloadToWatson) {
    let headers = new Headers ();
    headers.append ('Content-Type', 'application/json');

    payloadToWatson = payloadToWatson || {};
    return this.http.post ('/api/queryCollection',
      JSON.stringify (payloadToWatson), {headers: headers}).map (res => res.json ());
  }

  // first calls conversation service
  // if the returned context contains "longTail" attribute set to true, call the query service using NLP query and send back the results and passages
  public processQuestion(payloadToWatson) {
    var processQuestionSource = new Subject<any>();
    this.message(payloadToWatson).subscribe (
        data1 => {
            if (data1 && data1.context.longtail) {
                // call queryService
                this.queryCollection(payloadToWatson).subscribe(
                  data2 => {
                    console.log("query result : "+JSON.stringify(data2));
                    data1.output.CEPayload = [];
                    let parser = new DOMParser();
                    let ce;
                    let rexp = new RegExp("\((.+?)<\/p>){1,3}","g");
                    data2.results.forEach(element => {
                      ce = {title:'',body:'',bodySnippet:'',sourceUrl:''};
                      let doc = parser.parseFromString(element.html, "text/html");
                      let nodeList = doc.querySelectorAll("head [property='og:url']");
                      ce.sourceUrl = nodeList[0].getAttribute("content");
                      nodeList = doc.querySelectorAll("head [property='og:title']");
                      ce.title = nodeList[0].getAttribute("content");
                      nodeList = doc.querySelectorAll("head [property='og:description']");
                      ce.bodySnippet = nodeList[0].getAttribute("content");
                      let bodyParagNodeList = doc.querySelectorAll("body p");
                      //ce.body = element.text.match(rexp);
                      //ce.body = element.highlight.html.toString();
/*                      let pCount = 0;
                      bodyParagNodeList.forEach(el => {
                        pCount++;
                        if (pCount <= 3)
                          ce.body = ce.body + el.nodeValue + "<br>";
                      });
*/
                      ce.body = bodyParagNodeList[0].innerHTML+'...<br><br>'+bodyParagNodeList[1].innerHTML+'...<br><br>'+bodyParagNodeList[2].innerHTML;
                      data1.output.CEPayload.push(ce);
                    });
                  processQuestionSource.next(data1);                                    
                  },
                  error2 => {}
                );
            } else 
              processQuestionSource.next(data1);
//            this.processQuestionSource.complete();
          },
          error1 => {
            processQuestionSource.error(error1);
          });
      return processQuestionSource;
  }
}
