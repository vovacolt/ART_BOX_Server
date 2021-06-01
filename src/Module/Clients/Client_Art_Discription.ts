import { BaseResponseI } from "../System/ResponseSys";

export interface ArtI 
{
    count?: number;
    id?: number;
    widget_id?: string;
    name?: string;
    author?: string;
    age?: string;
    description?: Text;
    url?: Text;
}

export interface CountI 
{
    count?: number;
}

export class ArtE 
{
    public static NAME = 'art_description';
}



