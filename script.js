document.addEventListener('DOMContentLoaded', () => {
    // Lógica do botão de redirecionamento para o WhatsApp do Hero
    const heroWhatsappBtn = document.querySelector('a[href="#whatsapp"]');
    if (heroWhatsappBtn) {
        heroWhatsappBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const telefone = '5551999999999'; // Substitua pelo número real
            const mensagem = 'Olá! Gostaria de saber mais sobre a Cabana Schmitt.';
            window.open(`https://wa.me/${telefone}?text=${encodeURIComponent(mensagem)}`, '_blank');
        });
    }

    // Lógica do formulário de consulta de disponibilidade no Footer
    const formConsultar = document.querySelector('form');
    
    if (formConsultar) {
        formConsultar.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Coletar dados dos inputs
            const nome = formConsultar.querySelector('input[type="text"]').value;
            const checkin = formConsultar.querySelectorAll('input[type="date"]')[0].value;
            const checkout = formConsultar.querySelectorAll('input[type="date"]')[1].value;
            const hospedes = formConsultar.querySelector('select').value;
            const pet = formConsultar.querySelector('input[type="checkbox"]').checked ? 'Sim' : 'Não';
            
            // Validação simples
            if (!nome || !checkin || !checkout) {
                alert('Por favor, preencha seu nome e as datas de check-in e check-out.');
                return;
            }

            // Formatar datas para o padrão brasileiro (DD/MM/AAAA)
            const formatarData = (dataString) => {
                const [ano, mes, dia] = dataString.split('-');
                return `${dia}/${mes}/${ano}`;
            };

            const telefone = '5551999999999'; // Substitua pelo número real
            
            // Montar a mensagem estruturada
            const mensagem = `Olá! Gostaria de consultar a disponibilidade da Cabana Schmitt.%0A%0A*Detalhes da reserva:*%0A- Nome: ${nome}%0A- Check-in: ${formatarData(checkin)}%0A- Check-out: ${formatarData(checkout)}%0A- Hóspedes: ${hospedes}%0A- Levará Pet: ${pet}`;
            
            // Redirecionar para o WhatsApp
            window.open(`https://wa.me/${telefone}?text=${mensagem}`, '_blank');
        });
    }
});
