'use strict;'
//Include crypto to generate the movie id
var crypto = require('crypto');

module.exports = function() {
    return {
        microfilmList : [],
        /*
         * Save the movie inside the "db".
         */
        save(movie) {
            movie.id = crypto.randomBytes(20).toString('hex'); // fast enough for our purpose
            this.microfilmList.push(movie);
            return 1;           
        },
        /*
         * Retrieve a movie with a given id or return all the movies if the id is undefined.
         */
        find(id) {
            if(id) {
                return this.microfilmList.find(element => {
                        return element.id === id;
                    }); 
            }else {
                return this.microfilmList;
            }
        },
        /*
         * Get all the newspapers
         */
         allNewspapers() {
            return this.microfilmList.map(element => { 
                return {"name": element.newspaper};
            });
         },

        /*
         * Search for microfilms based on query
         */
         searchMicrofilms(newspaper) {
            return this.microfilmList.filter( microfilm => {
                    return newspaper == microfilm.newspaper;
                });          
         },

        /*
         * Delete a movie with the given id.
         */
        remove(id) {
            var found = 0;
            this.microfilmList = this.microfilmList.filter(element => {
                    if(element.id === id) {
                        found = 1;
                    }else {
                        return element.id !== id;
                    }
                });
            return found;           
        },
        /*
         * Update a movie with the given id
         */
        update(id, movie) {
            var movieIndex = this.microfilmList.findIndex(element => {
                return element.id === id;
            });
            if(movieIndex !== -1) {
                this.microfilmList[movieIndex].title = movie.title;
                this.microfilmList[movieIndex].year = movie.year;
                return 1;
            }else {
                return 0;
            }
        }       
    }
};  