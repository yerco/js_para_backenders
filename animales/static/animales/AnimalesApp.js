(function(window, $) {
    window.AnimalesApp = function ($wrapper) {

        this.$wrapper = $wrapper;
        this.helper = new Helper(this.$wrapper);

        this.$wrapper.on(
            'click',
            'tbody tr',
            this.handleRowClick.bind(this)
        )

        this.$wrapper.on(
            'click',
            '.js-delete-row',
            this.handleComidaDelete.bind(this)
        )

        this.$wrapper.on(
            'submit',
            '.js-new-animales-form',
            this.handleNewFormSubmit.bind(this)
        )

        this.$wrapper.on(
            'blur',
            '.js-update-row',
            this.handleRowUpdate.bind(this)
        )
    };

    $.extend(window.AnimalesApp.prototype , {
        _selectors: {
            newAnimalForm: '.js-new-animales-form'
        }
    })

    $.extend(window.AnimalesApp.prototype, {
        handleRowClick: function () {
            console.log("Click en Fila");
        },
        handleComidaDelete: function (e) {
            e.preventDefault();

            let $link = $(e.currentTarget);

            $link.addClass('text-danger');
            $link.find('.fa')
                .removeClass('fa-trash')
                .addClass('fa-spinner')
                .addClass('fa-spin');

            let deleteUrl = $link.data('url');
            let $row = $link.closest('tr');
            let that = this;

            $.ajax({
                url: deleteUrl,
                method: 'POST',
                data: {csrfmiddlewaretoken: csrftoken}
            })
                .done(function (data) {
                    console.log(data);
                    $row.fadeOut('normal', function () {
                        $(this).remove();
                        that.updateTotalComida();
                    });
                })
                .fail(function () {
                    console.log("error");
                })
                .always(function () {
                    console.log("completado");
                });
        },
        updateTotalComida: function () {
            this.$wrapper.find('.js-total-comida').html(
                this.helper.calculateTotalComida()
            );
        },
        handleNewFormSubmit: function (e) {
            e.preventDefault();
            console.log("enviando");
            let $form = $(e.currentTarget);
            let formData = {}
            $.each($form.serializeArray(), function(key, fieldData) {
                formData[fieldData.name] = fieldData.value;
            })
            let $tbody = this.$wrapper.find('tbody');
            let that = this;
            $.ajax({
                url: $form.data('url'),
                method: 'POST',
                data: JSON.stringify(formData),
                dataType: "json",
                contentType: "application/json",
                headers: {"X-CSRFToken": csrftoken }
            })
                .done(function(data) {
                    that._clearForm();
                    that._addRow(data);
                    console.log("ok");
                })
                .fail(function() {
                    console.log("error");
                })
                .always(function() {
                    console.log("complete");
                });
        },
        handleRowUpdate: function(e) {
            let $target = $(e.currentTarget);
            let $row = $target.closest('tr');
            let $values = $row[0].getElementsByTagName("td");
            let data = {}
            data.id = $values[0].innerHTML;
            data.especie = $values[1].innerHTML;
            data.nombre = $values[2].innerHTML;
            data.numero = $values[3].innerHTML;
            data.comida = $values[4].innerHTML
            let that = this;
            $.ajax({
                url: $row.data('url'),
                data: JSON.stringify(data),
                method: 'POST',
                dataType: "json",
                contentType: "application/json",
                headers: {"X-CSRFToken": csrftoken }
            })
                .done(function(d) {
                    console.log("done");

                    //console.log(that.helper.calculateTotalComida());
                    that.$wrapper.find('.js-total-comida').html(
                        that.helper.calculateTotalComida()
                    );
                })
                .fail(function() {
                    console.log("fail");
                })
                .always(function() {
                    console.log("always");
                });
        },
        _clearForm: function() {
            $form = this.$wrapper.find(this._selectors.newAnimalForm);
            $form[0].reset();
        },
        _addRow: function(animales) {
            console.log(animales);
            let tplText = $("#js-animales-row-template").html();
            let tpl = _.template(tplText);

            let html = tpl(animales);
            this.$wrapper.find('tbody').append($.parseHTML(html));
            
            this.updateTotalComida();
        }
    });
    
    let Helper = function ($wrapper) {
        this.$wrapper = $wrapper
    };

    $.extend(Helper.prototype, {
        calculateTotalComida : function () {
            let total = 0;
            this.$wrapper.find('tbody tr').each(function () {
                if (undefined !== $(this).data('comida')) {
                     total += parseInt($(this).data('comida'));
                }
            });

            return total;
        }
    });

})(window, jQuery);
