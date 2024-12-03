import { ethers } from "hardhat";
const BN = require("bn.js");

const decimal = 10 ** 18;
const exampleNumber = 100000 * decimal;
const exampleNumber2 = 1000000000000 * decimal;

function noExponents(_number: number) {
  var data = String(_number).split(/[eE]/);
  if (data.length == 1) return data[0];

  var z = "",
    sign = _number < 0 ? "-" : "",
    str = data[0].replace(".", ""),
    mag = Number(data[1]) + 1;

  if (mag < 0) {
    z = sign + "0.";
    while (mag++) z += "0";
    return z + str.replace(/^\-/, "");
  }
  mag -= str.length;
  while (mag--) z += "0";
  return str + z;
}

function getBigNumberEx() {
  console.log("exampleNumber with Exponents >>", exampleNumber);

  // Use new BN(value) instead of BN.from()
  const noExponentsExample = new BN(noExponents(exampleNumber));
  console.log("exampleNumber toString : ", noExponentsExample.toString());

  const noExponentsExample2 = new BN(noExponents(exampleNumber2));
  console.log(
    "noExponentsExample2 toString : ",
    noExponentsExample2.toString()
  );

  const addResult = noExponentsExample.add(noExponentsExample2);
  console.log("addResult : ", addResult.toString());

  // If you want to work with units, you can use ethers utils to parse it
  const addDecimal = ethers.parseUnits(addResult.toString(), 18);
  console.log("addDecimal >>", addDecimal);
}

getBigNumberEx();
