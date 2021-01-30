let AnimalesApp = {
    initialize: function($wrapper) {
        this.$wrapper = $wrapper;

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

        $(this).addClass('text-danger');
        $(this).find('.fa')
            .removeClass('fa-trash')
            .addClass('fa-spinner')
            .addClass('fa-spin');
        let deleteUrl = $(this).data('url');
        let $row = $(this).closest('tr');
        let $totalComida = AnimalesApp.$wrapper.find('.js-total-comida');
        let newTotal = parseInt($totalComida.html()) - parseInt($row.data('comida'));
        $.ajax({
            url: deleteUrl,
            method: 'POST',
            data: { csrfmiddlewaretoken: csrftoken }
        })
            .done(function() {
                $row.fadeOut("slow", function() {
                    $(this).remove();
                    AnimalesApp.updateTotalComida();
                })
            })
            .fail(function() {
                console.log('error')
            })
            .always(function() {
                console.log('completado')
            });
    },
    updateTotalComida: function() {
        let total = 0;
        this.$wrapper.find('tbody tr').each(function() {
            if (undefined !== $(this).data('comida')) {
                total += parseInt($(this).data('comida'));
            }
        });
        this.$wrapper.find('.js-total-comida').html(total);
    },
    whatIsThis: function(saludo) {
        console.log(this, saludo);
    }
};