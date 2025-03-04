const get = async (url) => {
    const response = await fetch(url);
    return await response.json();
};

const post = async (url, data) => {
    await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });
};

const del = async (url) => {
    let response = await fetch(url, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
    });
    return response;
};

const put = async (url, data) => {
    let response = await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });
    return response;
}

export { get, post, del, put };
