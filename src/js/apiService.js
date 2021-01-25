const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '19964688-39e6ce365709953a823cd9b18';
const IMAGE_TYPE = 'photo';
const ORIENTATION = 'horizontal';
const PER_PAGE = 12;

export default class ApiService{
    constructor(){
        this.searchQuery = '';
        this.page = 1;
    }

    fetchPhotoGallery(searchQuery) {
         const url = `${BASE_URL}?image_type=${IMAGE_TYPE}&orientation=${ORIENTATION}&q=${this.searchQuery}&page=${this.page}&per_page=${PER_PAGE}&key=${API_KEY}`;
        // https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=что_искать&page=номер_страницы&per_page=12&key=твой_ключ

        return fetch(url)
            .then(r => r.json())
            .then(data => {
                // console.log(data);
                this.incrementPage();
                // console.log(data.hits);
                return data.hits;
            });
    }

    incrementPage() {
        this.page += 1;
    }

    resetPage() {
        this.page = 1;
    }

    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }
}