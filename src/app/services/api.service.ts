import {
  HttpClient,
  HttpErrorResponse
} from "@angular/common/http";
import {
  catchError
} from "rxjs/internal/operators";
import {
  Observable,
  throwError
} from "rxjs";
import {
  Injectable
} from "@angular/core";
import {
  Router
} from "@angular/router";
import {
  MatSnackBar
} from '@angular/material/snack-bar';




@Injectable({
  providedIn: "root"
})
export class ApiService {
  private url: string = "http://localhost:8000/api/";
  public url_asset: string = this.url+"upload/img/";

  constructor(private http: HttpClient, private router: Router, private snackBar: MatSnackBar) {}

  sort(): Observable < any > {
    return this.http
      .post < any > (this.url + "algorithm/sort", {})
      .pipe(catchError(this.errorHandler));
  }

  exp(data): Observable < any > {
    return this.http
      .post < any > (this.url + "algorithm/exp", data)
      .pipe(catchError(this.errorHandler));
  }

  json(): Observable < any > {
    return this.http
      .get < any > ("https://data.cityofchicago.org/resource/ydr8-5enu.json", {})
      .pipe(catchError(this.errorHandler));
  }

  login(data): Observable < any > {
    return this.http
      .post < any > (this.url + "auth/login", data)
      .pipe(catchError(this.errorHandler));
  }

  register(data): Observable < any > {
    return this.http
      .post < any > (this.url + "auth/register", data)
      .pipe(catchError(this.errorHandler));
  }

  update(data): Observable < any > {
    return this.http
      .post < any > (this.url + "profile/update", data)
      .pipe(catchError(this.errorHandler));
  }

  user(id): Observable < any > {
    return this.http
      .get < any > (this.url + "profile/info/"+id , {})
      .pipe(catchError(this.errorHandler));
  }

  index(): Observable < any > {
    return this.http
      .get < any > (this.url + "product/index", {})
      .pipe(catchError(this.errorHandler));
  }


  query(query): Observable < any > {
    return this.http
      .post < any > (this.url + "product/query", {
        "query": query
      })
      .pipe(catchError(this.errorHandler));
  }

  info(id, user): Observable < any > {
    return this.http
      .get < any > (this.url + "product/info/"+id+"/"+user, {})
      .pipe(catchError(this.errorHandler));
  }

  upload(data): Observable < any > {
    return this.http
      .post < any > (this.url + "product/upload", data)
      .pipe(catchError(this.errorHandler));
  }



  delete(data): Observable < any > {
    return this.http
      .post < any > (this.url + "product/delete", data)
      .pipe(catchError(this.errorHandler));
  }

  product_update(data): Observable < any > {
    return this.http
      .post < any > (this.url + "product/update", data)
      .pipe(catchError(this.errorHandler));
  }

  comment(data): Observable < any > {
    return this.http
      .post < any > (this.url + "comment/publish", data)
      .pipe(catchError(this.errorHandler));
  }

  comment_like(data): Observable < any > {
    return this.http
      .post < any > (this.url + "comment/like", data)
      .pipe(catchError(this.errorHandler));
  }

  comment_dislike(data): Observable < any > {
    return this.http
      .post < any > (this.url + "comment/dislike", data)
      .pipe(catchError(this.errorHandler));
  }
  comment_delete(data): Observable < any > {
    return this.http
      .post < any > (this.url + "comment/delete", data)
      .pipe(catchError(this.errorHandler));
  }

  cart(user): Observable < any > {
    return this.http
      .get < any > (this.url + "cart/index/"+user , {})
      .pipe(catchError(this.errorHandler));
  }


  clear(data): Observable < any > {
    return this.http
      .post < any > (this.url + "cart/clear", data)
      .pipe(catchError(this.errorHandler));
  }

  add(data): Observable < any > {
    return this.http
      .post < any > (this.url + "cart/add", data)
      .pipe(catchError(this.errorHandler));
  }

  add_item(data): Observable < any > {
    return this.http
      .post < any > (this.url + "cart/add_item", data)
      .pipe(catchError(this.errorHandler));
  }

  rem_item(data): Observable < any > {
    return this.http
      .post < any > (this.url + "cart/rem_item", data)
      .pipe(catchError(this.errorHandler));
  }

  del_item(data): Observable < any > {
    return this.http
      .post < any > (this.url + "cart/del_item", data)
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    this.snackBar.open("Server error: " + error.error.message + ".", '', {
      duration: 2000
    });
    console.log(error.error);
    return throwError(error.error || "Server error");
  }

  get isLoggedIn(): boolean {
    return !!localStorage.getItem("user");
  }

  get getUser(): string {
    return localStorage.getItem("user");
  }

  get getUrl(): string {
    return this.url;
  }

  get getQuery(): string {
    return (localStorage.getItem("query")) ? localStorage.getItem("query") : "";
  }

  logout() {
    localStorage.removeItem("user");
    window.location.reload();
  }
}
