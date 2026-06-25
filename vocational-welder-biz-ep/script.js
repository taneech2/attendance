function showPhase(index) {
    document.querySelectorAll('.phase').forEach(function(p) {
        p.classList.remove('active');
    });
    document.getElementById('phase-' + index).classList.add('active');

    document.querySelectorAll('.life-btn').forEach(function(b, i) {
        b.classList.toggle('active', i === index);
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
}
