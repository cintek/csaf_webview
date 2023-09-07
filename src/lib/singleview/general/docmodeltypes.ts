// This file is Free Software under the MIT License
// without warranty, see README.md and LICENSES/MIT.txt for details.
//
// SPDX-License-Identifier: MIT
//
// SPDX-FileCopyrightText: 2023 German Federal Office for Information Security (BSI) <https://www.bsi.bund.de>
//

export const CSAFDocProps = {
  DOCUMENT: "document",
  PRODUCTTREE: "product_tree",
  CATEGORY: "category",
  TRACKING: "tracking",
  DISTRIBUTION: "distribution",
  TLP: "tlp",
  TITLE: "title",
  LANG: "lang",
  CSAFVERSION: "csaf_version",
  ID: "id",
  LABEL: "label",
  STATUS: "status",
  INITIALRELEASEDATE: "initial_release_date",
  CURRENTRELEASEDATE: "current_release_date",
  PUBLISHER: "publisher",
  PUBLISHER_CATEGORY: "category",
  PUBLISHER_NAME: "name",
  PUBLISHER_NAMESPACE: "namespace",
  TRACKINGVERSION: "version",
  REVISIONHISTORY: "revision_history",
  VULNERABILITIES: "vulnerabilities"
} as const;

export const TLP = {
  AMBER: "AMBER",
  GREEN: "GREEN",
  RED: "RED",
  WHITE: "WHITE",
  ERROR: "Invalid TLP"
} as const;

export const EMPTY: string = "";

export type TLPKeys = (typeof TLP)[keyof typeof TLP];

export const Status = {
  draft: "draft",
  final: "final",
  interim: "interim",
  ERROR: "Invalid Status"
} as const;
export type StatusKeys = (typeof Status)[keyof typeof Status];

export const DocumentCategory = {
  CSAF_SECURITY_ADVISORY: "csaf_security_advisory",
  CSAF_BASE: "csaf_base",
  CSAF_VEX: "csaf_vex"
} as const;

export type Publisher = {
  category: string;
  name: string;
  namespace: string;
};

export type RevisionHistoryEntry = {
  date: string;
  legacyVersion?: string;
  number: number;
  summary: string;
};

export type FileHash = {
  algorithm: string;
  value: string;
};

export type Hashes = {
  fileHashes: FileHash[];
  fileName: string;
};

export type CPE = string;

export type PURL = string;

export type XGenericURI = {
  namespace: string;
  uri: string;
};

export const RelationshipCategory = {
  CSAF_RELATIONSHIP_CATEGORY_DEFAULT_COMPONENT_OF: "default_component_of",
  CSAF_RELATIONSHIP_CATEGORY_ExternalComponentOf: "external_component_of",
  CSAF_RELATIONSHIP_CATEGORY_INSTALLED_ON: "installed_on",
  CSAF_RELATIONSHIP_CATEGORY_INSTALLED_WITH: "installed_with",
  CSAF_RELATIONSHIP_CATEGORY_OPTIONAL_COMPONENT_OF: "optional_component_of"
} as const;
export type RelationshipCategory = (typeof RelationshipCategory)[keyof typeof RelationshipCategory];

export type ProductID = string;

export type ProductIdentificationHelper = {
  cpe?: CPE;
  hashes?: Hashes;
  modelNumbers?: string[];
  purl?: PURL;
  sbomURLs?: string[];
  serialNumbers?: string[];
  skus?: string[];
  xGenericURIs?: XGenericURI[];
};

export type FullProductName = {
  name: string;
  productID: ProductID;
  productIdentificationHelper?: ProductIdentificationHelper;
};

export type Relationship = {
  category: RelationshipCategory;
  fullProductName: FullProductName;
  productReference: ProductID;
  relatesToProductReference: ProductID;
};

export const BranchCategory = {
  CSAF_BRANCH_CATEGORY_ARCHITECTURE: "architecture",
  CSAF_BRANCH_CATEGORY_HOST_NAME: "host_name",
  CSAF_BRANCH_CATEGORY_LANGUAGE: "language",
  CSAF_BRANCH_CATEGORY_LEGACY: "legacy",
  CSAF_BRANCH_CATEGORY_PATCH_LEVEL: "patch_level",
  CSAF_BRANCH_CATEGORY_PRODUCT_FAMILY: "product_family",
  CSAF_BRANCH_CATEGORY_PRODUCT_NAME: "product_name",
  CSAF_BRANCH_CATEGORY_PRODUCT_VERSION: "product_version",
  CSAF_BRANCH_CATEGORY_PRODUCT_VERSION_RANGE: "product_version_range",
  CSAF_BRANCH_CATEGORY_SERVICE_PACK: "service_pack",
  CSAF_BRANCH_CATEGORY_SPECIFICATION: "specification",
  CSAF_BRANCH_CATEGORY_VENDOR: "vendor"
} as const;
export type BranchCategory = (typeof BranchCategory)[keyof typeof BranchCategory];

export type Branch = {
  branches?: Branch[];
  category: BranchCategory;
  name: string;
  product?: FullProductName;
};

export type Products = ProductID[];

export type ProductGroup = {
  groupID: string;
  productIDs: Products;
  summary?: string;
};

export type ProductTree = {
  branches?: Branch[];
  fullProductNames?: FullProductName[];
  productGroups?: ProductGroup[];
  relationships?: Relationship[];
};

export type DocModel = {
  productTree?: ProductTree;
  title: string;
  lang: string;
  csafVersion: string;
  category: string;
  tlp: string;
  id: string;
  status: string;
  published: string;
  lastUpdate: string;
  publisher: Publisher;
  trackingVersion: string;
  revisionHistory: RevisionHistoryEntry[];
  vulnerabilities: any;
  productVulnerabilities: Array<Array<string>>;
  isProductTreePresent: boolean;
  isDocPresent: boolean;
  isTrackingPresent: boolean;
  isDistributionPresent: boolean;
  isTLPPresent: boolean;
  isPublisherPresent: boolean;
  isVulnerabilitiesPresent: boolean;
  isRevisionHistoryPresent: boolean;
};

export type DocModelKey = keyof DocModel;
