 /**
  * @NApiVersion 2.x
  * @NScriptType ClientScript
  * @NModuleScope SameAccount
  */

  define(['N/record'], function(record) {
    function loadAssemblyWithPromise(id) {
      record.load.promise({
        type: record.Type.ASSEMBLY_ITEM,
        id: id
      }).then(function(result){
        var itemDetailsObj = new Object();
        var assembly = result;
        logAssemblySublist(assembly);
    }

    function logAssemblySublist(assembly) {
      var numLines = assembly.getLineCount({
         sublistId : 'component'
      });
      if (numLines > 0) {
        for (var i = 0; i < numLines; i++) {
          itemDetailsObj.component = assembly.getSublistValue({
             sublistId : 'component',
             fieldId : 'component',
             line : i
          });
          itemDetailsObj.quantity = assembly.getSublistValue({
             sublistId : 'component',
             fieldId : 'quantity',
             line : i
          });
          itemDetailsObj.quantityonhand = assembly.getSublistValue({
             sublistId : 'component',
             fieldId : 'quantityonhand',
             line : i
          });
          console.log('assembly item' + i + 'details', itemDetailsObj);
        }
      }
    });
    }

    function isE04I(item) {
      var itemName = item.getValue('itemid')
      if(itemName === 'E04-I') {
        return true;
      } else {
        return false;
      }
    }

    function pageInit(context) {
      var item = context.currentRecord;
      if(isE04I(item) === true) {
        loadAssemblyWithPromise(12578);
        loadAssemblyWithPromise(27);
        loadAssemblyWithPromise(12008);
        loadAssemblyWithPromise(57);
      }
    }

    return {
      pageInit: pageInit,
    }
 });
