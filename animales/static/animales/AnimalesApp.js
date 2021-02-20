(function(window, $) {
    window.AnimalesApp = {
        initialize: function ($wrapper) {
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
        },
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
        }
    };

    let Helper = function ($wrapper) {
        this.$wrapper = $wrapper
    };

    Helper.prototype.calculateTotalComida = function () {
        let total = 0;
        this.$wrapper.find('tbody tr').each(function () {
            if (undefined !== $(this).data('comida')) {
                 total += parseInt($(this).data('comida'));
            }
        });
        return total;
    }

})(window, jQuery);
