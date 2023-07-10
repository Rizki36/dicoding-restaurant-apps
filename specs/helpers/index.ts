export const clickLikeButton = (element: ShadowRoot) => {
  element
    .querySelector('[title="Tambah ke favorit"]')
    .dispatchEvent(new Event("click"));
};

export const clickUnlikeButton = (element: ShadowRoot) => {
  element
    .querySelector('[title="Hapus dari favorit"]')
    .dispatchEvent(new Event("click"));
};
