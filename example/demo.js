(function(root){
    var inputs = document.getElementsByTagName("input"),
        button = document.getElementsByTagName("button"),
        PasswordStrength = root.PasswordStrength,
        case1 = new PasswordStrength({autoFindInputs: false});
        case2 = new PasswordStrength({
            autoFindInputs: false,
            tagText:'Strength',
            strengthTexts:['Empty','Bad','Weak','Middle','Good','Strong']
        }),
        case3 = new PasswordStrength({
            autoFindInputs: false,
            tagText:'→_→',
            background: {
                'weaker': 'linear-gradient(to bottom, #f85032 0%,#f16f5c 50%,#f6290c 51%,#f02f17 71%,#e73827 100%)',
                'weak': 'linear-gradient(to bottom, #ffb76b 0%,#ffa73d 50%,#ff7c00 51%,#ff7f04 100%)',
                'normal': 'linear-gradient(to bottom, #fceabb 0%,#fccd4d 50%,#f8b500 51%,#fbdf93 100%)',
                'strong': ' linear-gradient(to bottom, #bcc687 0%,#a5bc2f 50%,#91aa1e 51%,#aac436 100%)',
                'stronger': 'linear-gradient(to bottom, #9fb249 0%,#6c9322 50%,#4e7200 51%,#668c20 100%)'
            },
            strengthTexts:[':|',':-(',':(', ':)', ':-)', ':-D']
        });

    case1.addInputs(inputs[0]);
    case2.addInputs(inputs[1]);
    case3.addInputs(inputs[2]);

    button[0].onclick = function(){
        if(case1.verify() && case2.verify() && case3.verify()){
            alert('Password passed verification');
            document.getElementsByTagName('form')[0].submit();
        }
        
        return false;
    };
})(this);