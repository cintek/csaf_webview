<!--
 This file is Free Software under the Apache-2.0 License
 without warranty, see README.md and LICENSES/Apache-2.0.txt for details.

 SPDX-License-Identifier: Apache-2.0

 SPDX-FileCopyrightText: 2023 German Federal Office for Information Security (BSI) <https://www.bsi.bund.de>
 Software-Engineering: 2023 Intevation GmbH <https://intevation.de>
-->
<script lang="ts">
  export let active = false;
  export let modal = false;
</script>

{#if modal}
  {#if active}
    <div class="loading-container">
      <i class="bx bx-loader-alt spinner" />
    </div>
  {/if}
{:else if active}
  <i class="bx bx-loader-alt spinner" />
{/if}
