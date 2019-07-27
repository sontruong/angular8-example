import { Component, ViewChild, HostListener } from '@angular/core';
import { Banner } from '../model/bannerimg';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { MovieService } from '../../video/service/service';
import { Genre } from '../../video/model/genre';
import { Movie } from '../../video/model/movie';
import { Base } from 'src/app/common/base';
import { Utils } from 'src/app/common/Utils';
import { ToasterService } from 'angular2-toaster';

@Component({
  selector: 'router-outlet',
  templateUrl: '../view/home.html'
})
export class HomeComponent extends Base {
    @ViewChild('slideshow', {static: false}) 
    slideshow: any;
    loading: string = "none";
    imageSources: string[] = [];
    tops: Banner[] = [];
    onTop: Banner = null;
    current: number;
    genres: Genre[];
    movies: Movie[];
    currentTab = 0;
    page: number = 1;
    maxPage: number = 1;
    genreId: number;
    constructor(private movieService: MovieService, private utils: Utils, private toasterService: ToasterService) {
        super();
    }
    
    @HostListener("window:scroll", [])
    onScroll(): void {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            if (this.maxPage === this.page) {
                return;
            }
            if (this.utils.isArrNNull(this.movies) && this.movies.length > 1000) {
                this.movies.splice(0, 100);
            }
            this.page += 1;
            this.getListMovies();
        }
    }
    ngOnInit(): void {
        this.tops.push(new Banner({ id: 1, title: 'WRATH OF THE TITANS', types: ['Fantasty', 'Animation', 'Family'], duration: '1h 52m', rating: 3.5, review: 5267 }));
        this.tops.push(new Banner({ id: 2, title: 'WRATH OF THE TITANS 2', types: ['Fantasty', 'Animation', 'Family'], duration: '1h 36m', rating: 3, review: 3245 }));
        this.tops.push(new Banner({ id: 3, title: 'WRATH OF THE TITANS 3', types: ['Fantasty', 'Animation', 'Family'], duration: '2h 11m', rating: 5, review: 1245 }));
        this.imageSources.push('assets/imgs/Bitmap.png');
        this.imageSources.push('assets/imgs/Bitmap.png');
        this.imageSources.push('assets/imgs/Bitmap.png');
        this.movieService.getGenres().subscribe(data => {
            this.genres = data.genres;
        }, error => {
            console.log()
        });
        this.selectTab(0);
    }

    bannerChange(index: number) {
        if (index === undefined || index > this.tops.length - 1) {
            this.onTop = undefined;
            return;
        }
        this.current = index;
        this.onTop = this.tops[index];
    }

    changeBanner(i: number) {
        this.slideshow.onSlide(i); 
    }

    selectedTabChange(event: MatTabChangeEvent) {
        this.selectTab(event.index);
    }

    selectTab(index: number) {
        this.currentTab = index;
        this.page = 1;
        this.maxPage = 1;
        this.movies = undefined;
        this.getListMovies();
    }

    selectedGenre(genre: Genre) {
        this.movies = undefined;
        this.genreId = genre.id;
        this.selectTab(4);
    }

    getListMovies() {
        this.loading = "block";
        if (this.currentTab == 0) {
            this.movieService.getPopular(this.page).subscribe(data => {
                this.maxPage = data.total_pages;
                // this.movies = data.results;
                this.appendMovie(data.results);
                this.loading = "none";
            }, error => {
                this.loading = "none";
                this.utils.showEToast(this.toasterService, error);
            });
            return;
        }
        if (this.currentTab == 1) {
            this.movieService.getTopRates(this.page).subscribe(data => {
                this.maxPage = data.total_pages;
                this.appendMovie(data.results);
                this.loading = "none";
            }, error => {
                this.loading = "none";
                this.utils.showEToast(this.toasterService, error);
            });
            return;
        }
        if (this.currentTab == 2) {
            this.movieService.getUpComming(this.page).subscribe(data => {
                this.maxPage = data.total_pages;
                this.appendMovie(data.results);
                this.loading = "none";
            }, error => {
                this.loading = "none";
                this.utils.showEToast(this.toasterService, error);
            });
            return;
        }

        if (this.currentTab == 4) {
            this.movieService.getByGenre(this.page, this.genreId).subscribe(data => {
                this.maxPage = data.total_pages;
                this.appendMovie(data.results);
                this.loading = "none";
            }, error => {
                this.loading = "none";
                this.utils.showEToast(this.toasterService, error);
            });
        }
    }

    appendMovie(ms: Movie[]) {
        if (this.utils.isArrNull(ms)) {
            return;
        }
        if (this.utils.isArrNull(this.movies)) {
            this.movies = [];
        }
        for (let detail of ms) {
            this.movies.push(detail);
        }
    }
}