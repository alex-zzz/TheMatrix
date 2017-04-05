var matrixRank = 3;

$(document).ready(function () {
    renderGrid("#jqGridLeft");
    renderGrid("#jqGridRight");
    renderGrid("#jqGridResult");
    //renderGrid(4, "#jqGridLeft", "GetMatrix");
    //renderGrid(4, "#jqGridRight", "GetMatrix");



    //var colM = [];

    //for (i = 1; i <= 5 ; i++) {
    //    colM[i] = "{index: " + i +", editable: true, edittype: 'text', editrules: { number: true }}";
    //}

    //$("#jqGridLeft").jqGrid({
    //    url: '@Url.Action("GetData")',
    //    datatype: "json",
    //    //colNames: ['1', '2', '3'],
    //    colModel: colM,
    //    rowNum: 3,
    //    loadonce: true, // загрузка только один раз
    //    cellEdit: true,
    //    cellsubmit: "clientArray",
    //    height: "auto",
    //    width: null,
    //    shrinkToFit: false
    //});

    //$("#jqGridRight").jqGrid({
    //    url: '@Url.Action("GetData")',
    //    datatype: "json",
    //    //colNames: ['1', '2', '3'],
    //    colModel: [
    //        {
    //            //index: '1',
    //            //width: 50,
    //            editable: true,
    //            edittype: "text",
    //            editrules: { number: true }
    //        },
    //        {
    //            //index: '2',
    //            //width: 50,
    //            editable: true,
    //            edittype: "text",
    //            editrules: { number: true }
    //        },
    //        {
    //            //index: '3',
    //            //width: 50,
    //            editable: true,
    //            edittype: "text",
    //            editrules: { number: true }
    //        },
    //    ],
    //    rowNum: 3,
    //    loadonce: true, // загрузка только один раз
    //    cellEdit: true,
    //    cellsubmit: "clientArray",
    //    height: "auto",
    //    width: null,
    //    shrinkToFit: false
    //});
    //$("#jqGridResult").jqGrid({
    //    //url: '@Url.Action("GetData")',
    //    url: 'GetData',

    //    datatype: "json",
    //    //colNames: ['1', '2', '3'],
    //    colModel: [
    //        {
    //            //index: '1',
    //            //width: 50,
    //            name: 'n1',
    //            editable: true,
    //            edittype: "text",
    //            editrules: { number: true }
    //        },
    //        {
    //            //index: '2',
    //            //width: 50,
    //            editable: true,
    //            edittype: "text",
    //            editrules: { number: true }
    //        },
    //        {
    //            //index: '3',
    //            //width: 50,
    //            editable: true,
    //            edittype: "text",
    //            editrules: { number: true }
    //        },
    //    ],
    //    rowNum: 3,
    //    loadonce: true, // загрузка только один раз
    //    //cellEdit: true,
    //    cellsubmit: "clientArray",
    //    height: "auto",
    //    width: null,
    //    shrinkToFit: false

    //});

    //var widthLeft = $('#jqGridLeft_container').width();
    //$('#jqGridLeft').width(widthLeft - 6);
    //var widthRight = $('#jqGridRight_container').width();
    //$('#jqGridRight').width(widthRight - 6);
    //var widthResult = $('#jqGridResult_container').width();
    //$('#jqGridResult').width(widthResult - 6);



    //$('.ui-jqgrid-hdiv').hide();


});

$(window).bind('resize', function () {
    var widthLeft = $('#jqGridLeft_container').width();
    $('#jqGridLeft').width(widthLeft - 6);
    var widthRight = $('#jqGridRight_container').width();
    $('#jqGridRight').width(widthRight - 6);
    var widthResult = $('#jqGridResult_container').width();
    $('#jqGridResult').width(widthResult - 6);
});

$('select.rank').on('change', function () {

    matrixRank = this.value;

    //$('select.rank').each(function () { this.val(matrixRank) });

    $("#jqGridLeft").GridUnload();
    $("#jqGridRight").GridUnload();
    $("#jqGridResult").GridUnload();

    renderGrid("#jqGridLeft");
    renderGrid("#jqGridRight");
    renderGrid("#jqGridResult");

    setTimeout(function () {
        $("#jqGridLeft").trigger("reloadGrid")
    }, 1000);
    setTimeout(function () {
        $("#jqGridRight").trigger("reloadGrid")
    }, 1000);
    setTimeout(function () {
        $("#jqGridResult").trigger("reloadGrid")
    }, 1000);
})

$('#setIdentityLeft').on('click', function () {
    renderGrid3("#jqGridLeft", "GetMatrix")
})

$('#setZeroLeft').on('click', function () {
    setZero("#jqGridLeft");
})

$('#setZeroRight').on('click', function () {
    setZero("#jqGridRight");
})

function setZero(gridId) {

    for (i = 1; i <= matrixRank; i++) {

        var rowCells = {};

        for (j = 1; j <= matrixRank; j++) {
            rowCells['c' + j] = 0;
        }

        var cells = rowCells;

        var t = jQuery(gridId).jqGrid('setRowData', i, cells);
    }
}

function renderGrid(gridId) {

    var data = [];
    var colNames = [];
    var colModel = [];

    for (i = 1; i <= matrixRank; i++) {
        colNames.push('c' + i);
    }

    for (i = 1; i <= matrixRank; i++) {
        //colM[i] = { name: c, editable: true, edittype: "text", editrules: { number: true } };
        colModelItem = {};
        colModelItem.name = 'c' + i;
        colModelItem.editable = true;
        colModelItem.edittype = "text";
        colModelItem.editrules = { number: true };
        //colModel.push(JSON.stringify(colModelItem));
        colModel.push(colModelItem);

    }

    for (i = 1; i <= matrixRank; i++) {
        dataItem = {};
        for (var j = 0; j < matrixRank; j++) {
            dataItem[colNames[j]] = "";
        }
        data.push(dataItem);
    }

    jQuery(gridId).jqGrid({
        datatype: 'local',
        colNames: colNames,
        colModel: colModel,
        rowNum: matrixRank,
        cellEdit: true,
        cellsubmit: "clientArray",
        height: "auto",
        width: null,
        shrinkToFit: false,
        gridComplete: function () {
            $('.ui-jqgrid-hdiv').hide();
            $('.jqgfirstrow').hide();

            var widthLeft = $('#jqGridLeft_container').width();
            $('#jqGridLeft').width(widthLeft - 6);

            var widthRight = $('#jqGridRight_container').width();
            $('#jqGridRight').width(widthRight - 6);

            var widthResult = $('#jqGridResult_container').width();
            $('#jqGridResult').width(widthResult - 6);
        }
    })

    for (var i = 0; i < matrixRank; i++) {
        jQuery(gridId).jqGrid('addRowData', i + 1, data[i]);
    }

};


function renderGrid3(gridId, urlAction) {
    $.ajax(
        {
            type: "POST",
            //url: '@Url.Action("urlAction")'.replace('urlAction', urlAction),
            url: urlAction,
            data: { rank: matrixRank },
            dataType: "json",
            success: function (result) {
                var colD = result.data;
                var colN = result.colNames;
                var colM = result.colModels;

                jQuery(gridId).jqGrid({
                    jsonReader: {
                        root: "rows",
                        repeatitems: false
                    },
                    mytype: 'POST',
                    datatype: 'jsonstring',
                    datastr: colD.rows,
                    colNames: colN,
                    colModel: colM,
                    rowNum: matrixRank,
                    cellEdit: true,
                    cellsubmit: "clientArray",
                    height: "auto",
                    width: null,
                    shrinkToFit: false,
                    gridComplete: function () {
                        //$('#jqGridLeft').jqGrid("setGridParam", { datatype: "jsonstring" })
                        $('.ui-jqgrid-hdiv').hide();
                        $('.jqgfirstrow').hide();

                        var widthLeft = $('#jqGridLeft_container').width();
                        $('#jqGridLeft').width(widthLeft - 6);

                        var widthRight = $('#jqGridRight_container').width();
                        $('#jqGridRight').width(widthRight - 6);

                        var widthResult = $('#jqGridResult_container').width();
                        $('#jqGridResult').width(widthResult - 6);
                    }
                })
            },
            error: function (x, e) {
                //alert(x.readyState + " " + x.status + " " + e.msg);
            }
        });
    //setTimeout(function () {
    //}, 50);
}


