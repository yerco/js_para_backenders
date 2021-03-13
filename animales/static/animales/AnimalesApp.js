(function(window, $) {
    window.AnimalesApp = function ($wrapper) {

        this.$wrapper = $wrapper;
        this.helper = new Helper(this.$wrapper);

        this.$wrapper.find('tbody tr').on(
            'click',
            this.handleRowClick.bind(this)
        )

        this.$wrapper.find('.js-delete-row').on(
            'click',
            this.handleComidaDelete.bind(this)
        )

        this.$wrapper.find('.js-new-animales-form').on(
            'submit',
            this.handleNewFormSubmit.bind(this)
        )
    };

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
