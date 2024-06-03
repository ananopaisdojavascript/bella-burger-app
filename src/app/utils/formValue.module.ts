import { Directive, Input } from "@angular/core";

@Directive({
  standalone:true,
  selector: "[patchFormGroupValues]"
})
export class PatchFormGroupValuesDirectiveModule {
  @Input() formGroup: any;
  @Input()
  set patchFormGroupValues(val: any) {
    if (!val) return;
    this.formGroup.patchValue(val, { emitEvent: false });
  }
}