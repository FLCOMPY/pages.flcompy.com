const FlModal = {
    open(){
        document
            .querySelector('.rmodal-orverlay')
            .classList
            .add('active')

    },
    close(){
        document
            .querySelector('.rmodal-orverlay')
            .classList
            .remove('active')
    }
}