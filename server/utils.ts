import Str from '@supercharge/strings';

const isValidUrl = (url: string): boolean => {
    const pattern = new RegExp(`((http|https)://)(www.)?` +  // Starts with http/https, followed by "://www."
            `[a-zA-Z0-9@:%._\\+~#?&//=]{2,256}\\.[a-z]` +    // Subdomain
            `{2,6}\\b([-a-zA-Z0-9@:%._\\+~#?&//=]*)`         // Top level domain
        )

    return !!pattern.test(url);
}

const isUrlFriendly = (alias: string): boolean => {
    const pattern = new RegExp(`^[a-zA-Z0-9_-]*$`)
    return pattern.test(alias);
}

const generateAlias = (): string => {
    return Str.random(8)    // Randomly generates an alias of length 8
}

export {
    isValidUrl,
    isUrlFriendly,
    generateAlias
}