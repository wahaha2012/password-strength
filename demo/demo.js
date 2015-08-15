(function(root){
    var inputs = document.getElementsByTagName("input"),
        button = document.getElementsByTagName("button"),
        PasswordStrength = root.PasswordStrength,
        case1 = new PasswordStrength({autoFindInputs: false}),
        case2 = new PasswordStrength({
            autoFindInputs: false,
            tagText:'Strength',
            strengthTexts:['Empty','Bad','Weak','Middle','Good','Strong']
        });

    case1.addInputs(inputs[0]);
    case2.addInputs(inputs[1]);

    button[0].onclick = function(){
        case1.valid();
        case2.valid();

        return false;
    };
})(this);