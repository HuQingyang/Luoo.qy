import * as React from "react";
import { ViewTypes, VolTypeItem, VolTypesList } from "../../types";
import { volStore } from "../../store";
import "./index.scss";
import { events, EventTypes } from "../../utils";


let volTypesRef: HTMLDivElement;

function getVolTypesRef(i: HTMLDivElement | null) {
  volTypesRef = i as HTMLDivElement;
}

function renderVolTypeItem(i: VolTypeItem) {
  const { type, name, img, value } = i;
  const onClick = () => volStore.changeVolType(value);
  return (
    <div key={type} className="category-item" onClick={onClick}>
      <p className="category-item-name">{name}</p>
      <p className="category-item-type">{type}</p>
      <div
        className="category-item-bg"
        style={{
          backgroundImage: `url(${img})`
        }}
      />
    </div>
  );
}

function VolTypes() {
  return (
    <div
      id="vol-types"
      className={`page view-${ViewTypes.VOLS_TYPE}`}
      ref={getVolTypesRef}
    >
      {VolTypesList.map(renderVolTypeItem)}
    </div>
  );
}

events.on(EventTypes.ScrollBackVolTypes, () => {
    volTypesRef.scrollTo(0, 0);
});

export { VolTypes };