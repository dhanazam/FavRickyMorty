export type CharacterDataItem = {
    id: number;
    name: string;
    status: string;
    type: string;
    gender: string;
    origin: {
        name: string;
        url: string;
    };
    location: {
        name: string;
        url: string;
    };
    image: string;
    episode: Array<number>;
    url: string;
    created: string;
};

export type GetCharactersResponse = {
    info: {
        count: number;
        pages: number;
        next: string;
        prev: string;
    };
    results: CharacterDataItem[];
};
