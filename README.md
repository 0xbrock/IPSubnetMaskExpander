#IP Subnet Mask Expander
========================

Expands a list of IP subnet masks into IP address ranges and then expands the resulting ranges into individual IP addresses.

This project is a browser version of my [IPSubnetMaskToIPRange](/0xbrock/IPSubnetMaskToIPRange) node.js project.

It wraps the excellent [Network and IP address calculator](http://www.tuxgraphics.org/toolbox/network_address_calculator_add.html "Network and IP address calculator") by Guido Socher to convert the IP subnet mask to an IP range. My contribution is just automating the conversion using a list of subnet masks, expanding the IP address ranges, and saving the result to csv files.

## Usage

Enter the subnet masks in the text area.  The subnet masks are found by format.

One per line:
```text
23.96.0.0/18
23.96.64.0/28
23.96.64.64/26
...
```

Intermixed with XML or commas:
```text
23.96.0.0/18, 23.96.64.0/28
<iprange Subnet="23.96.64.64/26" />
<iprange Subnet="23.96.64.128/27" />
...
```

OR a combination:
```text
23.96.0.0/18, 23.96.64.0/28
<iprange Subnet="23.96.64.64/26" />
<iprange Subnet="23.96.64.128/27" />
23.96.64.160/28
23.96.80.0/20
...
```

### Run

```text
click Calculate
```

### Ouput

The IP address ranges are displayed.  Click one of the download buttons to download a csv of the IP ranges or the expaned IP addresses.
* `Ranges` contains the ip address ranges. Columns: "IP Range Subnet Mask", "First IP", "Last IP"
* `Expaned Ranges` contains all of the ip addresses in the ranges. Columns: "Expanded"
