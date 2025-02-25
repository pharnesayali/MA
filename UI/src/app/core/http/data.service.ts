import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, tap, map } from "rxjs/operators";
declare var settings: any;
@Injectable({
  providedIn: "root"
})
export class DataService {
  baseUrl = settings.api;
  constructor(private http: HttpClient) { }

  /**
   * Gets parameters from Pagination Object
   */
  getDataFromObject(model) {
    const params = new URLSearchParams();
    // tslint:disable-next-line:forin
    for (const key in model) {
      params.set(key, model[key]);
    }
    params.toString();
    return params;
  }

  /**
   * Gets data from api as an entity
   * @param url api path
   */
  getData(url): Observable<any> {
    return this.httpRequest(
      this.http.get(this.baseUrl + url, this.getHttpHeader())
    );
  }

  /**
   * Sends payload to api
   * @param url api path
   * @param data payload to send
   */
  postData(url, data): Observable<any> {
    return this.httpRequest(
      this.http.post(
        this.baseUrl + url,
        JSON.stringify(data),
        this.getHttpHeader()
      )
    );
  }

  /**
   * Calls api to delete an entity
   * @param url api path with id
   */
  deleteData(url: string): Observable<any>;
  /**
   * Calls api to delete an entity
   * @param url api path
   * @param id Item id to be deleted
   */
  deleteData(url: string, id: number): Observable<any>;
  deleteData(url: string, id?: number): Observable<any> {
    if (id) {
      return this.httpRequest(
        this.http.delete(this.baseUrl + url + "/" + id, this.getHttpHeader())
      );
    } else {
      return this.httpRequest(
        this.http.delete(this.baseUrl + url, this.getHttpHeader())
      );
    }
  }

  /**
   * Sends payload to api to update an entity
   * @param url api path
   * @param data payload to send
   */
  putData(url, data): Observable<any> {
    return this.httpRequest(
      this.http.put(
        this.baseUrl + url,
        JSON.stringify(data),
        this.getHttpHeader()
      )
    );
  }

  /**
   * Sends payload to api without authorization
   * @param url api path
   * @param data payload to send
   */
  postDataLogin(url, data): Observable<any> {
    const headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http
      .post(this.baseUrl + url, JSON.stringify(data), { headers: headers })
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(err);
        })
      );
  }
  postDataLoginAsotherUser(url, data): Observable<any> {
    const headers = new HttpHeaders()
      .set("Content-Type", "application/json")
      .set("access-control-allow-origin", "*");
    return this.http
      .post(this.baseUrl + url, JSON.stringify(data), { headers: headers })
      .pipe(
        catchError((err: HttpErrorResponse) => {
          return throwError(err);
        })
      );
  }

  /**
   * Sends payload to api to update some properties of entity
   * @param url api path
   * @param data payload to send
   */
  patchData<T>(url, data: T): Observable<boolean> {
    return <Observable<boolean>>(
      this.httpRequest(
        this.http.patch(
          this.baseUrl + url,
          JSON.stringify(data),
          this.getHttpHeader()
        )
      ).pipe(map(response => response && true))
    );
  }

  UploadFile(methodName, file): Observable<any> {
    const headers = new HttpHeaders();
    const Url = this.baseUrl + methodName;
    return this.http.post(Url, file, {
      headers: headers,
      responseType: "blob"
    });
  }
  UploadProfilePicture(methodName, file): Observable<any> {
    const headers = new HttpHeaders();
    const Url = this.baseUrl + methodName;
    return this.http.post(Url, file, { headers: headers });
  }
  // TODO: Use http interceptor instead
  private httpRequest(response: Observable<Object>): Observable<Object> {
    return response.pipe(tap(() => { }));
  }

  private getHttpHeader(): { headers: HttpHeaders } {
    return {
      headers: new HttpHeaders()
        // .set("Authorization", `Bearer ${sessionStorage.getItem("AccessToken")}`)
        .set("Content-Type", "application/json")
        .set("Cache-control", "no-cache")
        .set("Cache-control", "no-store")
        .set("Expires", "0")
        .set("Pragma", "no-cache")
    };
  }

  // postFile(url, data): Observable<any> {
  //   const headers = new HttpHeaders()
  //   // .set("Authorization", `Bearer ${token}`)
  //   .set("Access-Control-Allow-Origin", "true")
  //   .set("Cache-control", "no-cache")
  //   .set("Cache-control", "no-store")
  //   .set("Expires", "0")
  //   .set("Pragma", "no-cache");
  //   const options = { headers: headers };
  //   return this.http.post<any>(this.baseUrl + url, data, options).pipe(
  //     catchError((err: HttpErrorResponse) => {
  //       return throwError(err);
  //     })
  //   );
  // }
  postFile(url, data): Observable<any> {
    let headers = new HttpHeaders();
    /** In Angular 5, including the header Content-Type can invalidate your request */
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    const options = { headers: headers };
    return this.http.post<any>(this.baseUrl + url, data, options).pipe(
      catchError((err: HttpErrorResponse) => {
        return throwError(err);
      })
    );
  }

  firstLoginChangePassword(url, token): Observable<any> {
    const headers = new HttpHeaders()
      // .set("Authorization", `Bearer ${token}`)
      .set("Access-Control-Allow-Origin", "true")
      .set("Cache-control", "no-cache")
      .set("Cache-control", "no-store")
      .set("Expires", "0")
      .set("Pragma", "no-cache");
    const options = { headers: headers };
    return this.http.post<any>(this.baseUrl + url, options).pipe(
      catchError((err: HttpErrorResponse) => {
        return throwError(err);
      })
    );
  }
}
