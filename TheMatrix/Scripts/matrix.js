﻿var matrixRank = 3;

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
    transformMatrix(leftGrid, "ReverseMatrix")
})

$('#reverseRight').on('click', function () {
    transformMatrix(rightGrid, "ReverseMatrix")
})

$('#transposeLeft').on('click', function () {
    transformMatrix(leftGrid, "TransposingMatrix")
})

$('#transposeRight').on('click', function () {
    transformMatrix(rightGrid, "TransposingMatrix")
})

$('#multiplyByLeft').on('click', function () {
    calculateMatrices("MultByMatrix", "left")
})

$('#multiplyByRight').on('click', function () {
    calculateMatrices("SubtractMatrix", "right")
})

$('#leftMatrixToRight').on('click', function () {
    copyMatrixToMatrix(leftGrid, rightGrid)
})

$('#rightMatrixToLeft').on('click', function () {
    copyMatrixToMatrix(rightGrid, leftGrid)
})

$('#resultMatrixToRight').on('click', function () {
    copyMatrixToMatrix(resultGrid, rightGrid)
})

$('#resultMatrixToLeft').on('click', function () {
    copyMatrixToMatrix(resultGrid, leftGrid)
})

$('#swapMatrices').on('click', function () {
    swapMatrices()
})

$('#addMatrices').on('click', function () {
    calculateMatrices("AddMatrix")
})

$('#subtractMatrices').on('click', function () {
    calculateMatrices("SubtractMatrix")
})

$('#multiplyMatrices').on('click', function () {
    calculateMatrices("MultMatrix")
})

$('#divideMatrices').on('click', function () {
    calculateMatrices("DivideMatrix")
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
            stopEditing();
            data[i] = jQuery(gridId).jqGrid('getRowData', i + 1);
        }
        params.mdata = JSON.stringify(data);
    }

    params.rank = matrixRank;

    $.ajax(
        {
            type: "POST",
            url: $("#baseURL").val() + action,
            data: params,
            //data: { mdata: JSON.stringify(data), rank: matrixRank },
            dataType: "json",
            success: function (result) {

                if (!result.success) {
                    alert(result.responseData);
                    return;
                }

                var array = JSON.parse(result.responseData);

                for (i = 0; i < matrixRank; i++) {

                    var rowCells = {};

                    for (j = 0; j < matrixRank; j++) {
                        //rowCells['c' + (j + 1)] = array[i][j].toFixed(3);
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

var sourceMatrix;

function copyMatrixToMatrix(fromGrid, toGrid) {

    stopEditing();

    sourceMatrix = fromGrid;

    for (i = 1; i <= matrixRank; i++) {
        var row = jQuery(fromGrid).jqGrid('getRowData', i);
        jQuery(toGrid).setRowData(i, row);
    }

    $('#confirm-clear').modal('show');

    $('#confirm-clear .btn-ok').on("click", function () {
        //grid.jqGrid("clearGridData", true);

        for (i = 1; i <= matrixRank; i++) {
            for (j = 0; j < matrixRank; j++) {
                jQuery(sourceMatrix).jqGrid('setCell', i, j, " ");
            }
        }

        $('#confirm-clear').modal('hide');
    });
}

function swapMatrices() {

    stopEditing();

    for (i = 1; i <= matrixRank; i++) {
        var rowLeft = jQuery(leftGrid).jqGrid('getRowData', i);
        var rowRight = jQuery(rightGrid).jqGrid('getRowData', i);
        jQuery(leftGrid).setRowData(i, rowRight);
        jQuery(rightGrid).setRowData(i, rowLeft);
    }
}

function calculateMatrices(action, firstMatrix) {

    var params = {};

    stopEditing();
    var dataa = {};

    for (i = 0; i < matrixRank; i++) {
        dataa[i] = jQuery(leftGrid).jqGrid('getRowData', i + 1);
    }
    params.mdataa = JSON.stringify(dataa);

    var datab = {};

    for (i = 0; i < matrixRank; i++) {

        datab[i] = jQuery(rightGrid).jqGrid('getRowData', i + 1);
    }
    params.mdatab = JSON.stringify(datab);

    params.rank = matrixRank;
    params.firstMatrix = firstMatrix;

    $.ajax(
        {
            type: "POST",
            url: $("#baseURL").val() + action,
            data: params,
            dataType: "json",
            success: function (result) {

                if (!result.success) {
                    alert(result.responseData);
                    return;
                }

                var array = JSON.parse(result.responseData);

                for (i = 0; i < matrixRank; i++) {

                    var rowCells = {};

                    for (j = 0; j < matrixRank; j++) {
                        rowCells['c' + (j + 1)] = array[i][j];
                    }

                    var t = jQuery(resultGrid).jqGrid('setRowData', i + 1, rowCells);
                }
            },
            error: function (x, e) {
                alert(x.readyState + " " + x.status + " " + e.msg);
            }
        });

}

function stopEditing() {
    jQuery(leftGrid).jqGrid("saveCell", lastSelectedRowLeft, lastSelectedCellLeft);
    jQuery(rightGrid).jqGrid("saveCell", lastSelectedRowRight, lastSelectedCellRight);
}



