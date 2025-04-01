export type Fallback = {
    title: string;
    description: string;
    link: string;
}

export interface IBlurb<T extends string = never> {
    type: T;
    fallback?: Fallback;
}

export const defaultFallback: Fallback = {
    title: 'No title available',
    description: 'No description available',
    link: 'google.com'
}


export interface IGithubBlurb extends IBlurb<'github'> {
    repo: string;
    useGithubDescription?: boolean;
}

export interface IDocsBlurb extends IBlurb<'docs'> {
    title: string;
    description: string;
    link: string;
}


export interface ITextBlurb extends IBlurb<'text'> {
    title: string;
    description: string;
    link?: string;
    image?: string;
    color?: string;
}

export type Blurb = IGithubBlurb | IDocsBlurb | ITextBlurb;