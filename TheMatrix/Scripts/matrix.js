$(document).ready(function () {
    renderGrid(4, "#jqGridLeft", "GetMatrix");
    renderGrid(4, "#jqGridRight", "GetMatrix");



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
    $("#jqGridResult").jqGrid({
        url: '@Url.Action("GetData")',
        datatype: "json",
        //colNames: ['1', '2', '3'],
        colModel: [
            {
                //index: '1',
                //width: 50,
                editable: true,
                edittype: "text",
                editrules: { number: true }
            },
            {
                //index: '2',
                //width: 50,
                editable: true,
                edittype: "text",
                editrules: { number: true }
            },
            {
                //index: '3',
                //width: 50,
                editable: true,
                edittype: "text",
                editrules: { number: true }
            },
        ],
        rowNum: 3,
        loadonce: true, // загрузка только один раз
        //cellEdit: true,
        cellsubmit: "clientArray",
        height: "auto",
        width: null,
        shrinkToFit: false

    });

    //var widthLeft = $('#jqGridLeft_container').width();
    //$('#jqGridLeft').width(widthLeft - 6);
    //var widthRight = $('#jqGridRight_container').width();
    //$('#jqGridRight').width(widthRight - 6);
    var widthResult = $('#jqGridResult_container').width();
    $('#jqGridResult').width(widthResult - 6);

    $(window).bind('resize', function () {
        var widthLeft = $('#jqGridLeft_container').width();
        $('#jqGridLeft').width(widthLeft - 6);
        var widthRight = $('#jqGridRight_container').width();
        $('#jqGridRight').width(widthRight - 6);
        var widthResult = $('#jqGridResult_container').width();
        $('#jqGridResult').width(widthResult - 6);
    });

    //$('.ui-jqgrid-hdiv').hide();

    $('select.rank').on('change', function () {
        $("#jqGridLeft").GridUnload();

        renderGrid(this.value, "#jqGridLeft", "GetMatrix");

        setTimeout(function () {
            $("#jqGridLeft").trigger("reloadGrid")
        }, 1000);
    })
});

function renderGrid(rank, gridId, urlAction) {
    $.ajax(
        {
            type: "POST",
            //url: '@Url.Action("urlAction")'.replace('urlAction', urlAction),
            url: urlAction,
            data: { rank: rank },
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
                    rowNum: rank,
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
                    }
                })
            },
            error: function (x, e) {
                alert(x.readyState + " " + x.status + " " + e.msg);
            }
        });
    //setTimeout(function () {
    //}, 50);
}


