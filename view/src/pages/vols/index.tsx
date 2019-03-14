import * as React from "react";
import { RefObject } from "react";
import { observer } from "mobx-react";
import { store, volStore } from "../../store";
import { VolItem } from "../../components/vol-item";
import { Pagination } from "../../components/pagination";
import { ViewTypes, VolInfo } from "../../types";
import { Loading } from "../../components/loading";
import { Route } from "../../components/route";
import "./index.scss";

@observer
class Vols extends React.PureComponent {
  containerRef: RefObject<HTMLDivElement> = React.createRef();

  renderVols = () => {
    const { displayedItems } = volStore;
    if (!displayedItems) {
      return <Loading />;
    }
    return displayedItems.map((vol: VolInfo) => (
      <VolItem
        key={vol.id}
        id={vol.id}
        cover={vol.cover}
        title={vol.title}
        tags={vol.tags}
        color={vol.color}
        vol={vol.vol}
        isPlaying={false}
        isLiked={false}
        onToggle={() => {}}
      />
    ));
  };

  renderPagination = () => {
    const { pagination } = volStore;
    if (!pagination) return null;
    return <Pagination store={pagination} />;
  };

  render() {
    return (
      <Route
        currentView={store.view}
        view={ViewTypes.VOLS}
        id="vols"
        getRef={this.containerRef}
      >
        {this.renderVols()}
        {this.renderPagination()}
      </Route>
    );
  }
}

export { Vols };
