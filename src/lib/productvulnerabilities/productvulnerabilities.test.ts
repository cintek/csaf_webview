import { describe, it, expect } from "vitest";
import { extractProducts, extractVulnerabilities } from "./productvulnerabilities";

const emptyObject = {};

const noBranches = {
	product_tree: {}
};

const noProduct = {
	product_tree: {
		branches: []
	}
};

const oneProductNotNested = {
	product_tree: {
		branches: [
			{
				product: {
					product_id: "123",
					name: "Product A"
				}
			}
		]
	}
};

const simpleNested = {
	product_tree: {
		branches: [
			{
				branches: [
					{
						product: {
							product_id: "123",
							name: "Product A"
						}
					}
				]
			}
		]
	}
};

const complexNested = {
	product_tree: {
		branches: [
			{
				branches: [
					{
						branches: [
							{
								product: {
									product_id: "8910",
									name: "Product C"
								}
							}
						]
					},
					{
						product: {
							product_id: "123",
							name: "Product A"
						}
					},
					{
						product: {
							product_id: "3456",
							name: "Product B"
						}
					}
				]
			}
		]
	}
};

const noVulnerabilities = {
	vulnerabilities: []
};

const vulnerability_wo_CVE = {
	vulnerabilities: [{}]
};

const vulnerability_empty_product_status = {
	vulnerabilities: [
		{
			cve: "CVE-2018-0171",
			product_status: {}
		}
	]
};

const vulnerability_known_affected_empty = {
	vulnerabilities: [
		{
			cve: "CVE-2018-0171",
			product_status: {
				known_affected: []
			}
		}
	]
};

const vulnerability_known_affected_filled = {
	vulnerabilities: [
		{
			cve: "CVE-2018-0171",
			product_status: {
				known_affected: ["123", "456"]
			}
		}
	]
};

describe("Productvulnerabilities test", () => {
	it("Product: parses empty object", () => {
		const result = extractProducts(emptyObject);
		expect(result.length).toBe(0);
	});
});

describe("Productvulnerabilities test", () => {
	it("Product: parses no branches", () => {
		const result = extractProducts(noBranches);
		expect(result.length).toBe(0);
	});
});

describe("Productvulnerabilities test", () => {
	it("Product: parses no products", () => {
		const result = extractProducts(noProduct);
		expect(result.length).toBe(0);
	});
});

describe("Productvulnerabilities test", () => {
	it("Product: parses non nested list of products", () => {
		const result = extractProducts(oneProductNotNested);
		expect(result.length).toBe(1);
		expect(result[0].product_id).toBe("123");
		expect(result[0].name).toBe("Product A");
	});
});

describe("Productvulnerabilities test", () => {
	it("Product: parses simple nested list of products", () => {
		const result = extractProducts(simpleNested);
		expect(result.length).toBe(1);
		expect(result[0].product_id).toBe("123");
		expect(result[0].name).toBe("Product A");
	});
});

describe("Productvulnerabilities test", () => {
	it("Product: parses complex nested list of products", () => {
		const result = extractProducts(complexNested);
		expect(result.length).toBe(3);
		expect(result[0].product_id).toBe("8910");
		expect(result[0].name).toBe("Product C");
		expect(result[1].product_id).toBe("123");
		expect(result[1].name).toBe("Product A");
		expect(result[2].product_id).toBe("3456");
		expect(result[2].name).toBe("Product B");
	});
});

describe("Productvulnerabilities test", () => {
	it("Vulnerability: parses empty object", () => {
		const result = extractVulnerabilities(emptyObject);
		expect(result.length).toBe(0);
	});
});

describe("Productvulnerabilities test", () => {
	it("Vulnerability: parses no vulnerabilities", () => {
		const result = extractVulnerabilities(noVulnerabilities);
		expect(result.length).toBe(0);
	});
});

describe("Productvulnerabilities test", () => {
	it("Vulnerability: parses vulnerability without cve", () => {
		const result = extractVulnerabilities(vulnerability_wo_CVE);
		expect(result.length).toBe(1);
	});
});

describe("Productvulnerabilities test", () => {
	it("Vulnerability: parses vulnerability with empty product_status", () => {
		const result = extractVulnerabilities(vulnerability_empty_product_status);
		expect(result.length).toBe(1);
	});
});

describe("Productvulnerabilities test", () => {
	it("Vulnerability: parses vulnerability with empty known_affected", () => {
		const result = extractVulnerabilities(vulnerability_known_affected_empty);
		expect(result.length).toBe(1);
		expect(Object.keys(result[0].known_affected).length).toBe(0);
	});
});

describe("Productvulnerabilities test", () => {
	it("Vulnerability: parses vulnerability with filled known_affected", () => {
		const result = extractVulnerabilities(vulnerability_known_affected_filled);
		const value = result[0];
		expect(result.length).toBe(1);
		expect(Object.keys(value.known_affected).length).toBe(2);
		expect(value.known_affected["123"]).toBe("123");
		expect(value.known_affected["456"]).toBe("456");
	});
});
