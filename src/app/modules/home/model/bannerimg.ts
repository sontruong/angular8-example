
export class Banner {
    id: number;
    title: string;
    types: string[];
    duration: string;
    rating: number;
    review: number;

    constructor({ id, title, types, duration, rating, review }: { id: number; title: string; types: string[]; duration: string; rating: number; review: number; }) {
        this.id = id;
        this.title = title;
        this.types = types;
        this.duration = duration;
        this.rating = rating;
        this.review = review;
    }
}