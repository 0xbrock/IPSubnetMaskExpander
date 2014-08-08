// Start http://www.tuxgraphics.org/toolbox/network_address_calculator_add.html code.
//      Modified 'cform.element.values' to 'cform.element' on order to access the values as an object instead of having to dig into the '.value'.

function h_initArray() {
    this.length = h_initArray.arguments.length;
    for (var i = 0; i < this.length; i++)
        this[i] = h_initArray.arguments[i];
}

function h_from10toradix(value,radix){
    var retval = '';
    var ConvArray = new h_initArray(0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F');
    var intnum;
    var tmpnum;
    var i = 0;

    intnum = parseInt(value,10);
    if (isNaN(intnum)){
        retval = 'NaN';
    }else{
        if (intnum < 1){
            retval ="0";
        }else{
            retval = "";
        }
        while (intnum > 0.9){
            i++;
            tmpnum = intnum;
            // cancatinate return string with new digit:
            retval = ConvArray[tmpnum % radix] + retval;
            intnum = Math.floor(tmpnum / radix);
            if (i > 100){
                // break infinite loops
                retval = 'NaN';
                break;
            }
        }
    }
    return retval;
}

function h_paddto2(str) {
    while(str.length <2){
        str= "0" + str;
    }
    return(str);
}

function h_paddto8(str) {
    while(str.length <8){
        str= "0" + str;
    }
    return(str);
}

//--------------------------

function h_countbitsfromleft(num)
{
    if (num == 255 ){
        return(8);
    }
    i = 0;
    bitpat=0xff00;
    while (i < 8){
        if (num == (bitpat & 0xff)){
            return(i);
        }
        bitpat=bitpat >> 1;
        i++;
    }
    return(Number.NaN);
}

function calcNWbits(cform)
{
    sumofbits=0;
    tmpvar = parseInt(cform.snm_1,10);
    if (isNaN(tmpvar)){
        cform.result = 'invalid';
        return;
    }
    bitsfromleft=h_countbitsfromleft(tmpvar);
    if (isNaN(bitsfromleft)){
        cform.result = 'invalid';
        return;
    }
    sumofbits+=bitsfromleft;
    //
    tmpvar = parseInt(cform.snm_2,10);
    if (isNaN(tmpvar)){
        cform.result = 'invalid';
        return;
    }
    bitsfromleft=h_countbitsfromleft(tmpvar);
    if (isNaN(bitsfromleft)){
        cform.result = 'invalid';
        return;
    }
    sumofbits+=bitsfromleft;
    //
    tmpvar = parseInt(cform.snm_3,10);
    if (isNaN(tmpvar)){
        cform.result = 'invalid';
        return;
    }
    bitsfromleft=h_countbitsfromleft(tmpvar);
    if (isNaN(bitsfromleft)){
        cform.result = 'invalid';
        return;
    }
    sumofbits+=bitsfromleft;
    //
    tmpvar = parseInt(cform.snm_4,10);
    if (isNaN(tmpvar)){
        cform.result = 'invalid';
        return;
    }
    bitsfromleft=h_countbitsfromleft(tmpvar);
    if (isNaN(bitsfromleft)){
        cform.result = 'invalid';
        return;
    }
    sumofbits+=bitsfromleft;
    cform.result = sumofbits;
    return;
}

function resetform1(cform) {
    cform.result="";
    cform.snm_1=255;
    cform.snm_2=255;
    cform.snm_3=255;
    cform.snm_4=0;
}

//--------------------------

function h_fillbitsfromleft(num)
{
    if (num >= 8 ){
        return(255);
    }
    bitpat=0xff00;
    while (num > 0){
        bitpat=bitpat >> 1;
        num--;
    }
    return(bitpat & 0xff);
}

function calcNWmask(cform)
{
    tmpvar = parseInt(cform.bits,10);
    if (isNaN(tmpvar) || tmpvar > 32 || tmpvar < 0){
        cform.snm_1 = 'ERR';
        cform.snm_2="";
        cform.snm_3="";
        cform.snm_4="";
        return(1);
    }
    cform.snm_1=0;
    cform.snm_2=0;
    cform.snm_3=0;
    cform.snm_4=0;
    if (tmpvar >= 8){
        cform.snm_1 = 255;
        tmpvar-=8;
    }else{
        cform.snm_1 = h_fillbitsfromleft(tmpvar);
        return(0);
    }
    if (tmpvar >= 8){
        cform.snm_2 = 255;
        tmpvar-=8;
    }else{
        cform.snm_2 = h_fillbitsfromleft(tmpvar);
        return(0);
    }
    if (tmpvar >= 8){
        cform.snm_3 = 255;
        tmpvar-=8;
    }else{
        cform.snm_3 = h_fillbitsfromleft(tmpvar);
        return(0);
    }
    cform.snm_4 = h_fillbitsfromleft(tmpvar);
    return(0);
}

function calcNWmaskForm2(cform)
{
    var rt=0;
    cform.hex_1="";
    cform.hex_2="";
    cform.hex_3="";
    cform.hex_4="";
    rt=calcNWmask(cform);
    if (rt !=0 ){
        // error
        return(1);
    }
    tmpvar=cform.snm_1;
    cform.hex_1 = h_paddto2(h_from10toradix(tmpvar,16));
    tmpvar=cform.snm_2;
    cform.hex_2 = h_paddto2(h_from10toradix(tmpvar,16));
    tmpvar=cform.snm_3;
    cform.hex_3 = h_paddto2(h_from10toradix(tmpvar,16));
    tmpvar=cform.snm_4;
    cform.hex_4 = h_paddto2(h_from10toradix(tmpvar,16));
}

function resetform2(cform) {
    cform.bits=24;
    cform.snm_1="";
    cform.snm_2="";
    cform.snm_3="";
    cform.snm_4="";
    cform.hex_1="";
    cform.hex_2="";
    cform.hex_3="";
    cform.hex_4="";
}

//--------------------------

function resetform3(cform) {
    cform.ip_1=10;
    cform.ip_2=0;
    cform.ip_3=0;
    cform.ip_4=255;
    cform.bits_1="";
    cform.bits_2="";
    cform.bits_3="";
    cform.bits_4="";
    cform.hex_1="";
    cform.hex_2="";
    cform.hex_3="";
    cform.hex_4="";
}

function calcBinBits(cform)
{
    cform.bits_1="";
    cform.bits_2="";
    cform.bits_3="";
    cform.bits_4="";
    //
    tmpvar = parseInt(cform.ip_1,10);
    if (isNaN(tmpvar) || tmpvar < 0 || tmpvar > 255){
        cform.bits_1 = 'ERR';
        return;
    }
    cform.bits_1 = h_paddto8(h_from10toradix(tmpvar,2));
    cform.hex_1 = h_paddto2(h_from10toradix(tmpvar,16));
    //
    tmpvar = parseInt(cform.ip_2,10);
    if (isNaN(tmpvar) || tmpvar < 0 || tmpvar > 255){
        cform.bits_2 = 'ERR';
        return;
    }
    cform.bits_2 = h_paddto8(h_from10toradix(tmpvar,2));
    cform.hex_2 = h_paddto2(h_from10toradix(tmpvar,16));
    //
    tmpvar = parseInt(cform.ip_3,10);
    if (isNaN(tmpvar)  || tmpvar < 0 || tmpvar > 255){
        cform.bits_3 = 'ERR';
        return;
    }
    cform.bits_3 = h_paddto8(h_from10toradix(tmpvar,2));
    cform.hex_3 = h_paddto2(h_from10toradix(tmpvar,16));
    //
    tmpvar = parseInt(cform.ip_4,10);
    if (isNaN(tmpvar) || tmpvar < 0 || tmpvar > 255){
        cform.bits_4 = 'ERR';
        return;
    }
    cform.bits_4 = h_paddto8(h_from10toradix(tmpvar,2));
    cform.hex_4 = h_paddto2(h_from10toradix(tmpvar,16));
}

//--------------------------

function reset_rest_from4(cform){
    cform.bcast_1 ="";
    cform.bcast_2 ="";
    cform.bcast_3 ="";
    cform.bcast_4 ="";
    //
    cform.nwadr_1 ="";
    cform.nwadr_2 ="";
    cform.nwadr_3 ="";
    cform.nwadr_4 ="";
    //
    cform.firstadr_1 ="";
    cform.firstadr_2 ="";
    cform.firstadr_3 ="";
    cform.firstadr_4 ="";
    //
    cform.lastadr_1 ="";
    cform.lastadr_2 ="";
    cform.lastadr_3 ="";
    cform.lastadr_4 ="";
    //
    cform.snm_1 ="";
    cform.snm_2 ="";
    cform.snm_3 ="";
    cform.snm_4 ="";
    //
    cform.numofaddr ="";
}

function resetform4(cform) {
    cform.bits=24;
    cform.ip_1=10;
    cform.ip_2=0;
    cform.ip_3=0;
    cform.ip_4=5;
    //
    reset_rest_from4(cform);
}

function calNBFL(cform) {
    var rt=0;
    reset_rest_from4(cform);
    tmpvar = parseInt(cform.ip_1,10);
    if (isNaN(tmpvar) || tmpvar > 255 || tmpvar < 0){
        cform.numofaddr = 'ERR';
        return(1);
    }
    tmpvar = parseInt(cform.ip_2,10);
    if (isNaN(tmpvar) || tmpvar > 255 || tmpvar < 0){
        cform.numofaddr = 'ERR';
        return(1);
    }
    tmpvar = parseInt(cform.ip_3,10);
    if (isNaN(tmpvar) || tmpvar > 255 || tmpvar < 0){
        cform.numofaddr = 'ERR';
        return(1);
    }
    tmpvar = parseInt(cform.ip_4,10);
    if (isNaN(tmpvar) || tmpvar > 255 || tmpvar < 0){
        cform.numofaddr = 'ERR';
        return(1);
    }
    rt=calcNWmask(cform);
    if (rt !=0 ){
        // error
        return(1);
    }
    tmpvar=parseInt(cform.bits,10);
    if (tmpvar <0){
        cform.numofaddr = 'ERR';
        return(1);
    }
    if (tmpvar >32){
        cform.numofaddr = 'ERR';
        return(1);
    }
    if (tmpvar == 31){
        cform.numofaddr = "two hosts";
        cform.firstadr_1 = cform.ip_1 & cform.snm_1;
        cform.firstadr_2 = cform.ip_2 & cform.snm_2;
        cform.firstadr_3 = cform.ip_3 & cform.snm_3;
        cform.firstadr_4 = cform.ip_4 & cform.snm_4;
        //
        cform.lastadr_1 = cform.ip_1 | (~ cform.snm_1 & 0xff);
        cform.lastadr_2 = cform.ip_2 | (~ cform.snm_2 & 0xff);
        cform.lastadr_3 = cform.ip_3 | (~ cform.snm_3 & 0xff);
        cform.lastadr_4 = cform.ip_4 | (~ cform.snm_4 & 0xff);
        return(1);
    }
    if (tmpvar == 32){
        cform.numofaddr = "one host";
        cform.firstadr_1 = cform.ip_1;
        cform.firstadr_2 = cform.ip_2;
        cform.firstadr_3 = cform.ip_3;
        cform.firstadr_4 = cform.ip_4;
        return(1);
    }
    cform.numofaddr = Math.pow(2,32 - tmpvar) - 2;
    //
    cform.bcast_1 = cform.ip_1 | (~ cform.snm_1 & 0xff);
    cform.bcast_2 = cform.ip_2 | (~ cform.snm_2 & 0xff);
    cform.bcast_3 = cform.ip_3 | (~ cform.snm_3 & 0xff);
    cform.bcast_4 = cform.ip_4 | (~ cform.snm_4 & 0xff);
    //
    cform.nwadr_1 = cform.ip_1 & cform.snm_1;
    cform.nwadr_2 = cform.ip_2 & cform.snm_2;
    cform.nwadr_3 = cform.ip_3 & cform.snm_3;
    cform.nwadr_4 = cform.ip_4 & cform.snm_4;
    //
    cform.firstadr_1 = cform.nwadr_1;
    cform.firstadr_2 = cform.nwadr_2;
    cform.firstadr_3 = cform.nwadr_3;
    cform.firstadr_4 = parseInt(cform.nwadr_4) + 1;
    //
    cform.lastadr_1 = cform.bcast_1;
    cform.lastadr_2 = cform.bcast_2;
    cform.lastadr_3 = cform.bcast_3;
    cform.lastadr_4 = parseInt(cform.bcast_4) - 1;
    return(0);
}

//--------------------------

function resetform6(cform) {
    cform.numofaddr=5;
    cform.bits="";
    cform.maxaddr="";
    cform.snm_1="";
    cform.snm_2="";
    cform.snm_3="";
    cform.snm_4="";
}

function calcNeeded(cform){
    tmpvar = parseInt(cform.numofaddr,10);
    if (isNaN(tmpvar) || tmpvar > 0xfffffffe || tmpvar < 1){
        cform.bits="ERR";
        cform.snm_1="";
        cform.snm_2="";
        cform.snm_3="";
        cform.snm_4="";
        cform.maxaddr="";
        return;
    }
    expval=parseInt(Math.log(tmpvar)/Math.log(2)) + 1;
    maxaddrval=Math.pow(2,expval);
    if (maxaddrval - tmpvar < 2){
        expval+=1;
    }
    cform.maxaddr= Math.pow(2,expval) - 2;
    cform.bits=32 - expval;
    calcNWmask(cform);
}

//--------------------------
function calcAmount(cform){
    tmpvar = parseInt(cform.bits,10);
    if (isNaN(tmpvar) || tmpvar > 30 || tmpvar < 0){
        cform.numofaddr = 'ERR';
        cform.maxaddr="";
        cform.snm_1="";
        cform.snm_2="";
        cform.snm_3="";
        cform.snm_4="";
        return;
    }
    cform.maxaddr=Math.pow(2,32 - tmpvar);
    cform.numofaddr=Math.pow(2,32 - tmpvar)- 2;
    calcNWmask(cform);
}

function resetform7(cform) {
    cform.numofaddr="";
    cform.maxaddr="";
    cform.bits=27;
    cform.snm_1="";
    cform.snm_2="";
    cform.snm_3="";
    cform.snm_4="";
}
//--------------------------
function resetform8(cform) {
    cform.ip_1=255;
    cform.ip_2=255;
    cform.ip_3=240;
    cform.ip_4=0;
    cform.invert_1="";
    cform.invert_2="";
    cform.invert_3="";
    cform.invert_4="";
}

function calcIpInvert(cform){
    cform.invert_1="";
    cform.invert_2="";
    cform.invert_3="";
    cform.invert_4="";
    //
    tmpvar = parseInt(cform.ip_1,10);
    if (isNaN(tmpvar) ){
        cform.invert_1 = 'NaN';
        return;
    }
    cform.invert_1 = 0xff & ~ tmpvar;
    //
    tmpvar = parseInt(cform.ip_2,10);
    if (isNaN(tmpvar) ){
        cform.invert_2 = 'NaN';
        return;
    }
    cform.invert_2 = 0xff & ~ tmpvar;
    //
    tmpvar = parseInt(cform.ip_3,10);
    if (isNaN(tmpvar) ){
        cform.invert_3 = 'NaN';
        return;
    }
    cform.invert_3 = 0xff & ~ tmpvar;
    //
    tmpvar = parseInt(cform.ip_4,10);
    if (isNaN(tmpvar) ){
        cform.invert_4 = 'NaN';
        return;
    }
    cform.invert_4 = 0xff & ~ tmpvar;
}
//--------------------------
function resetform9(cform) {
    cform.dec_1="";
    cform.bin_1="";
    cform.num="";
}

function convertnum_hex(cform){
    cform.dec_1="";
    cform.bin_1="";
    //
    tmpvar=cform.num.replace(/0x/i,"");
    cform.num=tmpvar;
    tmpvar = parseInt(cform.num,16);
    if (isNaN(tmpvar) ){
        cform.dec_1 = 'NaN';
        cform.bin_1 = 'NaN';
        return;
    }
    cform.dec_1 = tmpvar;
    cform.bin_1 = h_from10toradix(tmpvar,2);
}
//--------------------------
function resetform10(cform) {
    cform.dec_1="";
    cform.hex_1="";
    cform.num="";
}

function convertnum_bin(cform){
    cform.dec_1="";
    cform.hex_1="";
    //
    tmpvar = parseInt(cform.num,2);
    if (isNaN(tmpvar) ){
        cform.dec_1 = 'NaN';
        cform.hex_1 = 'NaN';
        return;
    }
    cform.dec_1 = tmpvar;
    cform.hex_1 = h_from10toradix(tmpvar,16);
}
//--------------------------
function resetform11(cform) {
    cform.bin_1="";
    cform.hex_1="";
    cform.num="";
}

function convertnum_dec(cform){
    cform.bin_1="";
    cform.hex_1="";
    //
    tmpvar = parseInt(cform.num,10);
    if (isNaN(tmpvar) ){
        cform.bin_1 = 'NaN';
        cform.hex_1 = 'NaN';
        return;
    }
    cform.hex_1 = h_from10toradix(tmpvar,16);
    cform.bin_1 = h_from10toradix(tmpvar,2);
}
//--------------------------
function resetform12(cform) {
    cform.hex="";
    cform.ip_1="";
    cform.ip_2="";
    cform.ip_3="";
    cform.ip_4="";
    cform.bits_1="";
    cform.bits_2="";
    cform.bits_3="";
    cform.bits_4="";
}

function dot2hex(cform){
    cform.ip_1="";
    cform.ip_2="";
    cform.ip_3="";
    cform.ip_4="";
    cform.bits_1="";
    cform.bits_2="";
    cform.bits_3="";
    cform.bits_4="";
    tmpvar=cform.hex.replace(/0x/i,"");
    cform.hex=tmpvar.substr(0,8);
    //
    tmpvar = parseInt(tmpvar,16);
    if (isNaN(tmpvar)){
        cform.ip_1 = 'ERR';
        return;
    }
    cform.hex = h_paddto8(cform.hex);
    cform.ip_1 = parseInt(cform.hex.substr(0,2),16);
    cform.bits_1=h_paddto8(h_from10toradix(cform.ip_1,2));
    cform.ip_2 = parseInt(cform.hex.substr(2,2),16);
    cform.bits_2=h_paddto8(h_from10toradix(cform.ip_2,2));
    cform.ip_3 = parseInt(cform.hex.substr(4,2),16);
    cform.bits_3=h_paddto8(h_from10toradix(cform.ip_3,2));
    cform.ip_4 = parseInt(cform.hex.substr(6,2),16);
    cform.bits_4=h_paddto8(h_from10toradix(cform.ip_4,2));
}
//--------------------------
