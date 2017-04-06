var matrixRank = 3;

var leftGrid = "#jqGridLeft";
var rightGrid = "#jqGridRight";
var resultGrid = "#jqGridResult";

var lastSelectedRowLeft;
var lastSelectedCellLeft;
var lastSelectedRowRight;
var lastSelectedCellRight;

$(document).ready(function () {
    renderGrid(leftGrid, true);
    renderGrid(rightGrid, true);
    renderGrid(resultGrid, false);
});

$(window).bind('resize', function () {
    var widthLeft = $(leftGrid + '_container').width();
    $(leftGrid).width(widthLeft - 6);
    var widthRight = $(rightGrid + '_container').width();
    $(rightGrid).width(widthRight - 6);
    var widthResult = $(resultGrid + '_container').width();
    $(resultGrid).width(widthResult - 6);
});

$('select.rank').on('change', function () {

    matrixRank = this.value;

    $('select.rank').each(function () {
        $(this).val(matrixRank)
    });

    $(leftGrid).GridUnload();
    $(rightGrid).GridUnload();
    $(resultGrid).GridUnload();

    renderGrid(leftGrid, true);
    renderGrid(rightGrid, true);
    renderGrid(resultGrid, false);

    setTimeout(function () {
        $(leftGrid).trigger("reloadGrid")
    }, 1000);
    setTimeout(function () {
        $(rightGrid).trigger("reloadGrid")
    }, 1000);
    setTimeout(function () {
        $(resultGrid).trigger("reloadGrid")
    }, 1000);
})

$('#setIdentityLeft').on('click', function () {
    transformMatrix(leftGrid, "GetIdentityMatrix")
})

$('#setIdentityRight').on('click', function () {
    transformMatrix(rightGrid, "GetIdentityMatrix")
})

$('#setZeroLeft').on('click', function () {
    //setZero(leftGrid);
    transformMatrix(leftGrid, "GetZeroMatrix")
})

$('#setZeroRight').on('click', function () {
    //setZero(rightGrid);
    transformMatrix(rightGrid, "GetZeroMatrix")
})

$('#reverseLeft').on('click', function () {
    //setZero(leftGrid);
    transformMatrix(leftGrid, "ReverseMatrix")
})

$('#reverseRight').on('click', function () {
    //setZero(rightGrid);
    transformMatrix(rightGrid, "ReverseMatrix")
})

//function setZero(gridId) {

//    for (i = 1; i <= matrixRank; i++) {

//        var rowCells = {};

//        for (j = 1; j <= matrixRank; j++) {
//            rowCells['c' + j] = 0;
//        }

//        var cells = rowCells;

//        var t = jQuery(gridId).jqGrid('setRowData', i, cells);
//    }
//}

function renderGrid(gridId, editable) {

    var data = [];
    var colNames = [];
    var colModel = [];

    for (i = 1; i <= matrixRank; i++) {
        colNames.push('c' + i);
    }

    for (i = 1; i <= matrixRank; i++) {
        //colModelItem = { name: c1, editable: true, edittype: "text", editrules: { number: true } };
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
        cellEdit: editable,
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
        },
        beforeEditCell: function (rowid, cellname, v, iRow, iCol) {
            if (gridId == leftGrid) {
                lastSelectedRowLeft = iRow;
                lastSelectedCellLeft = iCol;
            }
            else if (gridId == rightGrid) {
                lastSelectedRowRight = iRow;
                lastSelectedCellRight = iCol;
            }
        }
    })

    for (var i = 0; i < matrixRank; i++) {
        jQuery(gridId).jqGrid('addRowData', i + 1, data[i]);
    }
};

function transformMatrix(gridId, action) {

    var params = {};

    if (action != "GetIdentityMatrix" && action != "GetZeroMatrix") {
        var data = {};
        for (i = 0; i < matrixRank; i++) {
            if (gridId == leftGrid) {
                jQuery(gridId).jqGrid("saveCell", lastSelectedRowLeft, lastSelectedCellLeft);
            }
            else if (gridId == rightGrid) {
                jQuery(gridId).jqGrid("saveCell", lastSelectedRowRight, lastSelectedCellRight);
            }
            data[i] = jQuery(gridId).jqGrid('getRowData', i + 1);
        }

        params.mdata = JSON.stringify(data);
    }

    params.rank = matrixRank;

    $.ajax(
        {
            type: "POST",
            url: action,
            data: params,
            //data: { mdata: JSON.stringify(data), rank: matrixRank },
            dataType: "json",
            success: function (result) {

                var array = JSON.parse(result);

                for (i = 0; i < matrixRank; i++) {

                    var rowCells = {};

                    for (j = 0; j < matrixRank; j++) {
                        rowCells['c' + (j + 1)] = array[i][j];
                    }

                    var t = jQuery(gridId).jqGrid('setRowData', i + 1, rowCells);
                }
            },
            error: function (x, e) {
                alert(x.readyState + " " + x.status + " " + e.msg);
            }
        });
}



