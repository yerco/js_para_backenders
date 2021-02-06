let AnimalesApp = {
    initialize: function($wrapper) {
        this.$wrapper = $wrapper;
        Helper.initialize(this.$wrapper);
        this.$wrapper.find('tbody tr').on(
            'click',
            this.handleRowClick
        )

        this.$wrapper.find('.js-delete-row').on(
            'click',
            this.handleComidaDelete
        )
    },
    handleRowClick: function() {
        console.log('Click en fila');
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
        let $totalComida = this.$wrapper.find('.js-total-comida');
        let newTotal = parseInt($totalComida.html()) - parseInt($row.data('comida'));
        $.ajax({
            url: deleteUrl,
            method: 'POST',
            data: { csrfmiddlewaretoken: csrftoken }
        })
            .done(function() {
                $row.fadeOut("slow", function() {
                    $(this).remove();
                    this.updateTotalComida;
                }.bind(this))
            })
            .fail(function() {
                console.log('error')
            })
            .always(function() {
                console.log('completado')
            });
    },
    updateTotalComida: function() {
        this.$wrapper.find('.js-total-comida').html(
            Helper.calculateTotalComida()
        );
    }
};

/**
 * pseudo private not meant to be called from outside
 */
let Helper = {
    initialize: function($wrapper) {
        this.$wrapper = $wrapper;
    },
    calculateTotalComida: function () {
        let totalComida = 0;
        this.$wrapper.find('tbody tr').each(function() {
            if (undefined !== $(this).data('comida')) {
                totalComida += parseInt($(this).data('comida'));
            }
        });

        return totalComida;
    },
};