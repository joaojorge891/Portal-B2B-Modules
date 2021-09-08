import { AbstractControl } from "@angular/forms";

export class customValidation {
    static passwordsMatch(formGroup: AbstractControl) {
        let senha = formGroup.get('password')!.value;
        let confirmarSenha = formGroup.get('confirmPassword')!.value;

        if (senha !== confirmarSenha) {
            formGroup.get('confirmPassword')!.setErrors({ senhasNaoCoincidem: true });
        }
    }
}