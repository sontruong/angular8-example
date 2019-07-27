import { HttpRequestService } from 'src/app/common/http.request.service';
import { Observable } from 'rxjs';
import { Genres } from '../model/genres';
import { OnesPaging } from 'src/app/common/objs';
import { Movie } from '../model/movie';
import { Utils } from 'src/app/common/Utils';

export class MovieService {
    constructor(private http: HttpRequestService, private utils: Utils) {

    }

    getGenres(): Observable<Genres> {
        return this.http.get<Genres>('genre/movie/list');
    }

    getPopular(page: number): Observable<OnesPaging<Movie>> {
        if (this.utils.isNull(page)) {
            page = 1;
        }
        return this.http.get<OnesPaging<Movie>>('movie/popular?page=' + page);
    }

    getTopRates(page: number): Observable<OnesPaging<Movie>> {
        if (this.utils.isNull(page)) {
            page = 1;
        }
        return this.http.get<OnesPaging<Movie>>('movie/top_rated?page=' + page);
    }

    getUpComming(page: number): Observable<OnesPaging<Movie>> {
        if (this.utils.isNull(page)) {
            page = 1;
        }
        return this.http.get<OnesPaging<Movie>>('movie/upcoming?page=' + page);
    }

    getByGenre(page: number, genreId: number): Observable<OnesPaging<Movie>> {
        if (this.utils.isNull(page)) {
            page = 1;
        }
        return this.http.get<OnesPaging<Movie>>('discover/movie?page=' + page + "&with_genres=" + genreId);
    }
}