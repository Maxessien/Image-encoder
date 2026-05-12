export type Platforms = "Android" | "Windows" | "macOS" | "Linux"

export interface ParsedUrlObj {
    platform: Platforms,
    customName: string,
    url: string
}

export interface ExtMappings {
    platform: Platforms,
    exts: string[]
}

export interface GithubReleaseAuthor {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    user_view_type: string;
    site_admin: boolean;
}

export interface GithubReleaseAsset {
    url: string;
    id: number;
    node_id: string;
    name: string;
    label: string | null;
    uploader: GithubReleaseAuthor;
    content_type: string;
    state: string;
    size: number;
    digest: string;
    download_count: number;
    created_at: string;
    updated_at: string;
    browser_download_url: string;
}

export interface GithubReleaseResponse {
    url: string;
    assets_url: string;
    upload_url: string;
    html_url: string;
    id: number;
    author: GithubReleaseAuthor;
    node_id: string;
    tag_name: string;
    target_commitish: string;
    name: string;
    draft: boolean;
    immutable: boolean;
    prerelease: boolean;
    created_at: string;
    updated_at: string;
    published_at: string;
    assets: GithubReleaseAsset[];
    tarball_url: string;
    zipball_url: string;
    body: string;
}

export const GITHUB_RELEASES_API_URL = "https://api.github.com/repos/Maxessien/PixelCipherTauri/releases/latest"

export const parseDownloadUrls = (urls: string[])=>{
    const extMappings: ExtMappings[] = [
        {platform: "Android", exts: ["apk"]},
        {platform: "Windows", exts: ["msi", "exe"]},
        {platform: "macOS", exts: ["dmg"]},
        {platform: "Linux", exts: ["rpm", "AppImage", "deb"]},
    ]
    const parsed: ParsedUrlObj[] = []

    for (const url of urls){
        const ext = url.split(".")[url.split(".").length - 1]
        const mapping = extMappings.find((m)=> m.exts.includes(ext))
        if (!mapping) continue
        parsed.push({
            customName: `PixelCipher.${ext}`,
            platform: mapping.platform,
            url
        })
    }
    
    return parsed
}