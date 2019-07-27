import { Component, Input } from '@angular/core';
import { Utils } from 'src/app/common/Utils';
import { Movie } from '../model/movie';
import { Base } from 'src/app/common/base';
import { Genre } from '../model/genre';

@Component({
    selector: 'list-m-selector',
    templateUrl: '../view/list.html'
  })
export class ListComponent extends Base {

    @Input()
    set api(movies: Movie[]) {
        this.movies = [];
        if (this.utils.isArrNull(movies)) {
            return;
        }
        this.movies = movies;
    }

    @Input()
    set lstGenre(genres: Genre[]) {
        this.genres = [];
        if (this.utils.isArrNull(genres)) {
            return;
        }
        this.genres = genres;
    }

    movies: Movie[];
    genres: Genre[];
    constructor(private utils: Utils) {
        super();
    }

    ngAfterViewInit() {

    }

    getType(ids: number[]): string {
        let result = "";
        for (let gen of this.genres) {
            for (let id of ids) {
                if (gen.id === id) {
                    result += gen.name + ", ";
                }
            }
        }
        if (result.length > 2) {
            result = result.substring(0, result.length - 2);
        }
        return result;
    }
}