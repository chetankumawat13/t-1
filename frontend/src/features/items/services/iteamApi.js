import API from "../../../app/axios";

// ➕ CREATE ITEM
export const createItemApi = (data) => API.post("/items", data);

//  GET ITEMS
// params can be { type: "deleted" } or { type: "archived" }
export const getItemsApi = (params) => API.get("/items", { params });

//  SOFT DELETE (moves item to Recently Deleted)
export const deleteItemApi = (id) => API.patch(`/items/${id}/delete`);

//  ARCHIVE (move item to Archive)
export const archiveItemApi = (id) => API.patch(`/items/${id}/archive`);

//  UNARCHIVE (move back to All Saves)
export const unarchiveItemApi = (id) => API.patch(`/items/${id}/unarchive`);

// ♻️ RESTORE (from Recently Deleted)
export const restoreItemApi = (id) => API.patch(`/items/${id}/restore`);

//  PERMANENT DELETE (remove completely)
export const permanentDeleteApi = (id) => API.delete(`/items/${id}/permanent`);

//  SEMANTIC SEARCH
export const semanticSearchApi = (query) =>
  API.post("/items/search", { query });