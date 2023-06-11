type UrlSplitter = {
  resource: string | null;
  id: string | null;
  verb: string | null;
};

const UrlParser = {
  parseActiveUrlWithCombiner() {
    const url = window.location.hash.slice(1).toLowerCase();
    const splittedUrl = this._urlSplitter(url);
    return this._urlCombiner(splittedUrl);
  },

  parseActiveUrlWithoutCombiner(): UrlSplitter {
    const url = window.location.hash.slice(1).toLowerCase();
    return this._urlSplitter(url);
  },

  _urlSplitter(url: string): UrlSplitter {
    const urlsSplits = url.split("/");
    return {
      resource: urlsSplits[1] || null,
      id: urlsSplits[2] || null,
      verb: urlsSplits[3] || null,
    };
  },

  _urlCombiner(splittedUrl) {
    return (
      (splittedUrl.resource ? `/${splittedUrl.resource}` : "/") +
      (splittedUrl.id ? "/:id" : "") +
      (splittedUrl.verb ? `/${splittedUrl.verb}` : "")
    );
  },
};

export default UrlParser;
