const getLocalStorage = () => {
    if (typeof window !== 'undefined') {
        let localStorageData = localStorage.getItem("Favorites");

        if(localStorageData == null){
            return [];
        }

        return JSON.parse(localStorageData);
    }
    return [];
};

const savLocalStorage = (location: string) => {
    if (typeof window !== 'undefined') {
        let favorites = getLocalStorage();

        if(!favorites.includes(location)){
            favorites.push(location);
        }

        localStorage.setItem("Favorites", JSON.stringify(favorites));
    }
};

const removeLocalStorage = (location: string) => {
    if (typeof window !== 'undefined') {
        let favorites = getLocalStorage();
        let nameFavorites = favorites.indexOf(location);

        favorites.splice(nameFavorites, 1);
        localStorage.setItem("Favorites", JSON.stringify(favorites));
    }
};


export { savLocalStorage, getLocalStorage, removeLocalStorage };