export const clickLikeButton = (element: Element) => {
  element
    .querySelector('[title="Tambah ke favorit"]')
    .dispatchEvent(new Event("click"));
};

export const clickUnlikeButton = (element: Element) => {
  element
    .querySelector('[title="Hapus dari favorit"]')
    .dispatchEvent(new Event("click"));
};
