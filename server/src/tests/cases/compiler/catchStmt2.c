test() {  
  // @lpc-expect-error: arrNot is not defined
  catch(call_other("foo", arrNot));
}
 
// @driver: fluffos
