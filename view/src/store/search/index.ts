import {searchVolStore} from "./search-vol";
import {searchTrackStore} from "./search-track";
import {searchArticleStore} from "./search-article";

import {action, observable, reaction} from "mobx";
import {getIPC} from "../../utils";
import {SearchViewTypes} from "../../types";

enum SearchType {
  VOL,
  ARTICLE,
  TRACK
}

const ipc = getIPC();

class SearchStore {
  constructor() {
    this.initReaction();
  }

  private initReaction = () => {
    reaction(() => {
      return this.searchText;
    }, this.search);
  };

  @observable
  public searchText: Maybe<string> = null;

  @action
  public setSearchText = (text: Maybe<string>) => {
    if (!text) {
      this.searchText = null;
      this.clearIds();
      return;
    }

    const t = text.trim();
    this.searchText = t;
    this.history = [t, ...this.history.filter(i => i !== t)];
  };

  @observable
  public searchType: SearchViewTypes = SearchViewTypes.VOLS;

  @action
  public setSearchType = (type: SearchViewTypes) => {
    this.searchType = type;
    if (type === SearchViewTypes.ARTICLES && searchArticleStore.isLoading) {
      return this.searchArticle();
    }
    if (type === SearchViewTypes.TRACKS && searchTrackStore.isLoading) {
      return this.searchTracks();
    }
  };

  @observable
  public history: string[] = ["迷幻摇滚", "vol788", "Beatles", "再见"];

  @action
  private clearIds = () => {
    searchVolStore.setIds(null);
    searchTrackStore.setIds(null);
    searchArticleStore.setIds(null);
  };

  @action
  private search = () => {
    this.clearIds();
    return this.searchVol();
  };

  @action
  private searchVol = async () => {
    if (!this.searchText) {
      return;
    }

    const items = await ipc.db.vol.search(this.searchText, { id: 1 });
    setTimeout(() => {
      searchVolStore.setIds(items.map(i => i.id));
    }, 1500);
  };

  @action
  private searchArticle = async () => {
    if (!this.searchText) {
      return;
    }

    const items = await ipc.db.article.search(this.searchText, { id: 1 });
    setTimeout(() => {
      searchArticleStore.setIds(items.map(i => i.id));
    }, 1500);
  };

  @action
  private searchTracks = async () => {};
}

const searchStore = new SearchStore();

export { searchStore, searchVolStore, searchTrackStore, searchArticleStore };
