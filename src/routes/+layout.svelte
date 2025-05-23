<!--
 This file is Free Software under the Apache-2.0 License
 without warranty, see README.md and LICENSES/Apache-2.0.txt for details.

 SPDX-License-Identifier: Apache-2.0

 SPDX-FileCopyrightText: 2023 German Federal Office for Information Security (BSI) <https://www.bsi.bund.de>
 Software-Engineering: 2023 Intevation GmbH <https://intevation.de>
-->
<script lang="ts">
  import "boxicons/css/boxicons.min.css";
  import { appStore } from "$lib/store";
  import { base } from "$app/paths";
  /*global __APP_VERSION__*/
  const version: string = __APP_VERSION__;
  const MODE = {
    SINGLE: "Switch to ROLIE-feed",
    FEED: "Switch to single view"
  };
  let switchToRoute = "";
  let headerText = "Advisory";
  $: if (mode === MODE.SINGLE) {
    if ($appStore.doc && $appStore.doc.title) {
      headerText = `${$appStore.doc["id"]}: ${$appStore.doc["title"]}`;
    } else {
      headerText = "Advisory";
    }
  } else {
    if ($appStore.currentFeed) {
      headerText = "ROLIE-Feed";
    } else if ($appStore.providerMetadata) {
      headerText = "Provider Metadata";
    } else {
      headerText = "Overview";
    }
  }
  $: mode = $appStore.ui.appMode;
  $: {
    if (mode === MODE.SINGLE) {
      if ($appStore.ui.lastFeed) {
        if ($appStore.ui.lastDoc) {
          switchToRoute = `${base}/feed?q=${$appStore.ui.lastFeed}&doc=${$appStore.ui.lastDoc}`;
        } else {
          switchToRoute = `${base}/feed?q=${$appStore.ui.lastFeed}`;
        }
      } else {
        if ($appStore.ui.lastDoc) {
          switchToRoute = `${base}/feed?doc=${$appStore.ui.lastDoc}`;
        } else {
          switchToRoute = `${base}/feed`;
        }
      }
    } else {
      if ($appStore.ui.lastDoc) {
        if ($appStore.ui.lastFeed) {
          switchToRoute = `${base}/?q=${$appStore.ui.lastDoc}&feed=${$appStore.ui.lastFeed}`;
        } else {
          switchToRoute = `${base}/?q=${$appStore.ui.lastDoc}`;
        }
      } else {
        if ($appStore.ui.lastFeed) {
          switchToRoute = `${base}/?feed=${$appStore.ui.lastFeed}`;
        } else {
          switchToRoute = `${base}/`;
        }
      }
    }
  }
  /**
   * Disable disables dropping a JSON anywhere on the page.
   * @param e
   */
  const disable = (e: Event) => {
    e.preventDefault();
  };

  const onSwitch = (_) => {
    appStore.setSelectedCVE("");
    appStore.setSelectedProduct("");
  };
</script>

<svelte:window
  on:dragover={disable}
  on:drop={disable}
  on:popstate={() => {
    appStore.setFeedErrorMsg("");
    appStore.setSingleErrorMsg("");
  }}
/>

<div class="content">
  <!-- svelte-ignore a11y-no-redundant-roles -->
  <div class="header">
    <div class="programname">
      <div>
        <h4 role="heading">CSAF Webview</h4>
      </div>
      <div>
        <small class="versionstring">v{version}</small>
      </div>
    </div>
    <div class="title">{headerText}</div>
    <div class="switchbtn">
      <a
        title={mode !== MODE.SINGLE ? "Switch to Advisory" : "Switch to Overview"}
        href={switchToRoute}
        on:click={onSwitch}
        class="btn">{mode !== MODE.SINGLE ? "Switch to Advisory" : "Switch to Overview"}</a
      >
    </div>
  </div>
  <slot />
</div>
