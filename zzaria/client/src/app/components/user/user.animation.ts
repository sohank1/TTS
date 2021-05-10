import {
    trigger,
    state,
    style,
    transition,
    animate,
} from "@angular/animations";

export const UserAnimation: any[] = [
    trigger("detail", [
        state("show", style({ opacity: 1, transform: "scale(1)" })),
        state("remove", style({ opacity: 0, transform: "scale(0.3)" })),

        transition("show => remove", [
            animate(
                "0.2s ease",
                style({ opacity: 0, transform: "scale(0.3)" })
            ),
        ]),

        transition("remove => show", [
            animate("0.2s ease", style({ opacity: 1, transform: "scale(1)" })),
        ]),
    ]),
];
